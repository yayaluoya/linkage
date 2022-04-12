<script lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ComApiCon } from "@/http/apiCon/main/ComApiCon";
import TabItem from ">/Blog/TabItem.vue";
import AllBlogTabs from ">/Blog/AllTabs.vue";
import MDShow from ">/md/MDShow.vue";
import comment from "./com/comment.vue";
import { Mes } from "@/mes/Mes";
import TimeLine from ">/Blog/TimeLine.vue";
import moment from "moment";
import { SSROpT } from "@/erect/SSROpT";
import { parseAsyncComOp } from "@/erect/AsyncComType";
import { getObscureQueryValue } from "-/getObscureQueryValue";
import AddBlog from ">/Blog/AddBlog.vue";
import { Edit, ArrowLeftBold } from "@element-plus/icons-vue";
import { UserDataProxy } from "@/localData/dataItem/UserDataProxy";
import { EPage } from "@/router/EPage";
import { TemporaryDataProxy } from "@/localData/dataItem/TemporaryDataProxy";
import { PageTool } from "@/router/PageTool";

export default {
  ...SSROpT.inject({
    async asyncHeadLabel(_op: parseAsyncComOp<EN.IBlogE>) {
      return {
        title: _op.com?.title || "博客",
      };
    },
    async asyncData(_op: parseAsyncComOp) {
      let urlSearch = new URLSearchParams(_op.url.split("?")[1] || "");
      //这里一定要做个验证，防止枚举爬虫
      let blogId = getObscureQueryValue(urlSearch.get("id"));
      if (blogId) {
        return ComApiCon.instance
          .getOneBlog(parseInt(blogId))
          .then((data) => {
            _op.com = data;
            return {
              ssrBolgData: data.content,
            };
          })
          .catch((e) => {
            return {
              ssrBolgData: "不存在这篇博客",
            };
          });
      }
      return {
        ssrBolgData: "不存在这篇博客",
      };
    },
  }),
  components: {
    TabItem,
    AllBlogTabs,
    MDShow,
    comment,
    TimeLine,
    AddBlog,
    Edit,
    ArrowLeftBold,
  },
  setup(props, ctx) {
    const route = useRoute();
    const router = useRouter();
    const ifEditBlog = ref(false);
    const blogId = computed<number | undefined>(() => {
      let id = getObscureQueryValue(route.query.id as any);
      return id ? parseInt(id) : undefined;
    });
    const blogData = ref<EN.IBlogE>();
    const loading = ref(false);
    const ifLogin = computed(() => {
      return UserDataProxy.instance.ifLogin;
    });

    const ifLink = computed(() => {
      return !!blogData.value?.externalLink;
    });

    /** 时间 */
    const time = computed(() => {
      if (!blogData.value) {
        return "";
      }
      return moment(parseInt(blogData.value!.createTime + "")).format(
        "YYYY年M月D日"
      );
    });

    /** 加载数据 */
    function loadData() {
      if (typeof blogId.value == "undefined") {
        return;
      }
      loading.value = true;
      ComApiCon.instance
        .getOneBlog(blogId.value)
        .then((data) => {
          blogData.value = data;
          //设置一下当前页面的标题
          document.title = blogData.value.title;
          //添加阅读数量
          TemporaryDataProxy.instance.ifShowBlod(data.id) ||
            ComApiCon.instance
              .addBlogShowNumber(data.id)
              .then(() => {
                blogData.value!.showNumber++;
              })
              .catch(Mes.handleHttpCatch);
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loading.value = false;
        });
    }

    /** 编辑博客 */
    function edit() {
      ifEditBlog.value = true;
    }

    /** 添加博客回调 */
    function change(_op: {
      type: "add" | "edit";
      data: EN.IBlogE;
      id: number;
    }) {
      if (_op.type == "edit") {
        blogData.value = _op.data;
      }
    }

    watch(
      () => route.query,
      () => {
        if (route.path == EPage.BlogShow) {
          loadData();
        }
      }
    );

    onMounted(() => {
      loadData();
    });

    /** 返回上一页 */
    function back() {
      PageTool.pageBack(EPage.Blog);
    }

    return {
      back,
      ifLogin,
      blogId,
      loading,
      blogData,
      time,
      ifEditBlog,
      ifLink,
      edit,
      change,
    };
  },
};
</script>

<template>
  <div class="blogShow">
    <my-erect>
      <AddBlog v-model:show="ifEditBlog" @change="change" :id="blogId" />
      <div class="left border-box">
        <div class="back">
          <div class="content" @click="back">
            <el-icon><ArrowLeftBold /></el-icon>
            <span>返回</span>
          </div>
          <el-icon v-if="ifLogin" @click="edit"><Edit /></el-icon>
        </div>
        <div class="md no" v-if="loading || !blogData">
          <el-skeleton :rows="5" animated />
        </div>
        <div class="md" v-if="!loading && blogData">
          <div class="content">
            <span class="title">{{ blogData.title }}</span>
            <div class="other">
              <span>{{ time }}</span>
              <span>阅读 {{ blogData.showNumber }}</span>
            </div>
            <div class="tab" v-if="blogData.tabsE && blogData.tabsE.length > 0">
              <TabItem
                class="item"
                v-for="(item, index) in blogData.tabsE"
                :key="index"
                :data="item"
              />
            </div>
            <MDShow
              v-if="!ifLink"
              class="md"
              :content="blogData.content"
              :md_theme="blogData.theme.md"
              :code_theme="blogData.theme.code"
            />
            <div v-if="ifLink" class="link">
              <a :href="blogData.externalLink" target="_blank"
                >前往>{{ blogData.externalLink }}</a
              >
            </div>
          </div>
          <div class="comment">
            <comment :blog_id="blogId" />
          </div>
        </div>
      </div>
      <div class="right">
        <AllBlogTabs class="tabs" />
        <TimeLine
          v-if="!loading && blogData"
          :size="1"
          class="timeLine"
          :on_blog_id="blogId"
        />
      </div>
      <template #s>
        {{ ssrBolgData }}
      </template>
    </my-erect>
  </div>
</template>

<style scoped lang="scss">
.blogShow {
  --tabs-width: 200px;
  --tabs-margin-left: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  > .left {
    width: calc(100% - var(--tabs-width) - var(--tabs-margin-left) - 2px);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    > .back {
      display: flex;
      padding: 10px;
      background-color: white;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px dashed var(--border-color);
      > .content {
        cursor: pointer;
        text-align: left;
        color: var(--color);
        font-weight: bold;
        font-size: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
      }
      > .el-icon {
        font-size: 20px;
        cursor: pointer;
        color: #cfcfcf;
      }
    }
    > .md {
      width: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      &.no {
        width: calc(100% - var(--padding) * 2);
        background-color: white;
        padding: var(--padding);
      }
      > .content {
        --bottom-size: 10px;
        width: calc(100% - var(--padding) * 2);
        display: flex;
        flex-direction: column;
        padding: var(--padding);
        background-color: white;
        border-bottom: 2px dashed var(--border-color);
        > .title {
          width: 100%;
          font-size: 28px;
          font-weight: bold;
          color: var(--color);
          margin-bottom: var(--bottom-size);
          line-height: 35px;
        }
        > .other {
          width: 100%;
          display: flex;
          align-items: center;
          color: #3a4650;
          font-size: 14px;
          margin-bottom: var(--bottom-size);
          > span {
            margin-right: 10px;
          }
        }
        > .tab {
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin-bottom: var(--bottom-size);
          padding-bottom: calc(var(--bottom-size) - 5px);
          border-bottom: 1px dashed var(--border-color);
          > .item {
            margin-right: 5px;
            margin-bottom: 5px;
          }
        }
        > .md {
          width: 100%;
        }
        > .link {
          padding: 20px;
          background-color: #f8f8f8;
          border-radius: 10px;
          font-size: 18px;
          font-weight: bold;
          > a {
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      > .comment {
        width: 100%;
        background-color: white;
      }
    }
  }
  > .right {
    width: var(--tabs-width);
    margin-left: var(--tabs-margin-left);
    display: flex;
    flex-direction: column;
    > .tabs {
      border-radius: var(--border-radius);
      margin-bottom: 20px;
    }
    > .timeLine {
    }
  }
}
</style>
