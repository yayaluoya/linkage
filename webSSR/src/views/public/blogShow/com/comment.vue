<script lang="ts">
import { ref, reactive, onMounted, watch, toRef, computed } from "vue";
import { ComApiCon } from "@/http/apiCon/main/ComApiCon";
import MDEdit from ">/md/MDEdit.vue";
import { Mes } from "@/mes/Mes";
import imgSelect from ">/imgSelect/imgSelect.vue";
import { headImg } from "@/const/headImg";
import { FormItemRule } from "element-plus/es/components/form/src/form.type";
import { ElForm } from "element-plus";
import { ComVerify } from "com_utils/ComVerify";
import Paginate from ">/Paginate/Paginate.vue";
import commentItem from "./commentItem.vue";
import { UserDataProxy } from "@/localData/dataItem/UserDataProxy";
import { BlogCDP } from "@/localData/dataItem/BlogCDP";

export default {
  components: { MDEdit, imgSelect, Paginate, commentItem },
  props: {
    blog_id: Number,
  },
  setup(props, ctx) {
    const ifLogin = computed(() => {
      return UserDataProxy.instance.ifLogin;
    });
    const loading = ref(false);
    const loadingSave = ref(false);
    const comList = ref<EN.IBlogComment[]>([]);
    const comment = reactive({
      name: ifLogin.value ? UserDataProxy.instance.data.dataE?.name : "路人",
      img: headImg,
      content: "",
      mdTheme: "",
      codeTheme: "",
    });
    const formRef = ref<InstanceType<typeof ElForm>>();
    const paginate = reactive({
      page: 1,
      size: 10,
      length: 0,
    });
    const ifEdit = ref(false);

    const formRules: Record<string, FormItemRule> = {
      name: {
        validator: (rule, value, callback) => {
          callback(ComVerify.BlogCommentV.name_(value) || undefined);
        },
      },
      content: {
        validator: (rule, value, callback) => {
          callback(ComVerify.BlogCommentV.content(value) || undefined);
        },
      },
    };

    watch(toRef(comment, "content"), () => {
      formRef.value!.validateField("content", (mes) => {});
    });

    /** 加载评论列表 */
    function loadComList() {
      if (!props.blog_id || loading.value) {
        return;
      }
      loading.value = true;
      ComApiCon.instance
        .findBC({
          size: paginate.size,
          page: paginate.page,
          query: {
            blogId: props.blog_id,
          },
        })
        .then((list) => {
          paginate.length = list.length;
          comList.value = list.list;
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loading.value = false;
        });
    }
    /** 分页数据改变 */
    function paginateChange(_page: number) {
      paginate.page = _page;
      loadComList();
    }

    /** 删除一条评论 */
    function deleteCom(id: number) {
      let index = comList.value.findIndex((item) => {
        return item.id == id;
      });
      if (index != -1) {
        comList.value.splice(index, 1);
        paginate.length--;
      }
    }

    /** 添加一条博客评论 */
    function save() {
      if (loadingSave.value) {
        return;
      }
      //先看是否能评论
      if (!BlogCDP.instance.ifC(props.blog_id!)) {
        Mes.warning("今日评论次数已达到最大值");
        return;
      }
      //表单验证
      formRef
        .value!.validate()!
        .then(() => {
          loadingSave.value = true;
          ComApiCon.instance
            .addBC({
              blogId: props.blog_id!,
              content: comment.content,
              name: comment.name,
              img: comment.img,
              theme: {
                md: comment.mdTheme,
                code: comment.codeTheme,
              },
            })
            .then((data) => {
              //如果当前是第一页的话就添加到列表中
              if (paginate.page == 1) {
                comList.value.unshift(data);
              }
              paginate.length++;
              //
              comment.content = "";
            })
            .catch(Mes.handleHttpCatch)
            .finally(() => {
              loadingSave.value = false;
            });
        })
        .catch((e) => {
          console.log("表单验证失败", e);
        });
    }

    onMounted(() => {
      loadComList();
    });

    return {
      headImg,
      loading,
      loadingSave,
      ifEdit,
      comList,
      comment,
      formRules,
      formRef,
      save,
      paginate,
      paginateChange,
      deleteCom,
      ifLogin,
    };
  },
};
</script>

<template>
  <div class="comment_">
    <div class="content" v-loading="loading">
      <div class="top">
        <span>全部评论，共({{ paginate.length }})条:</span>
        <div class="edit" v-show="ifLogin">
          <span>编辑</span>
          <el-switch v-model="ifEdit" />
        </div>
      </div>
      <div class="list">
        <commentItem
          @d="deleteCom"
          :if_edit="ifEdit"
          class="item"
          v-for="(item, index) in comList"
          :key="index"
          :item="item"
        />
      </div>
      <my-null v-if="!loading && comList.length <= 0" />
      <Paginate :paginate="paginate" class="page" @change="paginateChange" />
    </div>
    <div class="add" v-loading="loadingSave">
      <span>发一条评论吧:</span>
      <div class="content">
        <div class="left">
          <imgSelect class="img" v-model:img="comment.img" />
        </div>
        <div class="right">
          <el-form :model="comment" ref="formRef" :rules="formRules">
            <el-form-item prop="name">
              <el-input
                class="input"
                placeholder="请输入名字"
                clearable
                v-model="comment.name"
              />
            </el-form-item>
            <el-form-item prop="content">
              <MDEdit
                class="md"
                v-model:md="comment.content"
                v-model:md_theme="comment.mdTheme"
                v-model:code_theme="comment.codeTheme"
              />
            </el-form-item>
          </el-form>
          <my-button type="e" @click="save">提交</my-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.comment_ {
  --padding: 20px;
  > .content {
    width: calc(100% - var(--padding) * 2);
    padding: var(--padding);
    display: flex;
    flex-direction: column;
    background-color: var(--background-color);
    > .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      > span {
        font-size: 16px;
        font-weight: bold;
        color: var(--color);
      }
      > .edit {
        display: flex;
        flex-direction: row;
        align-items: center;
        > span {
          margin-right: 10px;
        }
      }
    }
    > .list {
      display: flex;
      flex-direction: column;
      > .item {
        margin-bottom: 20px;
      }
      > .item:nth-last-child(1) {
        margin-bottom: 0;
      }
    }
    > .page {
      justify-content: right;
    }
  }
  > .add {
    width: calc(100% - var(--padding) * 2);
    padding: var(--padding);
    display: flex;
    flex-direction: column;
    border-top: 2px dashed var(--border-color);
    > span {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
      color: var(--color);
    }
    > .content {
      --left-size: 40px;
      --left-margin-right: 10px;
      display: flex;
      flex-direction: row;
      > .left {
        width: var(--left-size);
        height: var(--left-size);
        margin-right: var(--left-margin-right);
        > .img {
          width: 100%;
          height: 100%;
          --border-radius: 50%;
        }
      }
      > .right {
        width: calc(100% - var(--left-size) - var(--left-margin-right));
        .md {
          --content-height: 300px;
        }
      }
    }
  }
}
</style>
