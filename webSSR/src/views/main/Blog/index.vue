<script lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue";
import { SSROpT } from "@/erect/SSROpT";
import BlogItem from ">/Blog/BlogItem.vue";
import { ComApiCon } from "@/http/apiCon/main/ComApiCon";
import Paginate from ">/Paginate/Paginate.vue";
import { Mes } from "@/mes/Mes";
import AllBlogTabs from ">/Blog/AllTabs.vue";
import { UserDataProxy } from "@/localData/dataItem/UserDataProxy";
import AddBlog from ">/Blog/AddBlog.vue";
import { useRoute, useRouter } from "vue-router";
import TabItem from ">/Blog/TabItem.vue";
import { EPage } from "@/router/EPage";
export default {
  ...SSROpT.inject({
    asyncHeadLabel() {
      return {
        title: "博客",
      };
    },
  }),
  components: { BlogItem, TabItem, Paginate, AllBlogTabs, AddBlog },
  setup() {
    const route = useRoute();
    const loading = ref(false);
    const blogDatas = ref<EN.IBlogE[]>([]);
    const query = reactive({
      str: "",
    });
    const paginate = reactive({
      page: 1,
      size: 8,
      length: 0,
    });
    const ifLogin = computed(() => {
      return UserDataProxy.instance.ifLogin;
    });
    const loadingTabs = ref(false);
    const ifAddBlog = ref(false);
    const editBlogId = ref(-1);
    const queryTags = ref<EN.IBlogTabE[]>([]);
    const queryTagNames = computed<string[]>(() => {
      return ((route.query.tags || "") as string).split(",");
    });
    /** 查询tag的版本 */
    let queryTagV = 0;

    watch(
      () => route.query,
      () => {
        if (route.path == EPage.Blog) {
          loadTabs();
        }
      }
    );

    /** 加载关联的标签 */
    function loadTabs() {
      //记录一下当前的版本，给后面做验证
      let v = ++queryTagV;
      loadingTabs.value = true;
      //通过tag名字加载所有tag
      ComApiCon.instance
        .byTabNamesGetTabs(queryTagNames.value)
        .then((list) => {
          if (v == queryTagV) {
            queryTags.value = list;
            findBlog(true);
            loadingTabs.value = false;
          }
        })
        .catch((...arg) => {
          if (v == queryTagV) {
            Mes.handleHttpCatch(...arg);
          }
        });
    }

    /** 查询博客 */
    function findBlog(ifResetPage = false) {
      if (loading.value) {
        return;
      }
      //重置分页
      if (ifResetPage) {
        paginate.page = 1;
        paginate.length = 0;
      }
      loading.value = true;
      ComApiCon.instance
        .findBlog({
          size: paginate.size,
          page: paginate.page,
          query: {
            str: query.str,
            tagIds: queryTags.value.map((item) => item.id),
          },
        })
        .then((data) => {
          paginate.length = data.length;
          blogDatas.value = data.list;
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loading.value = false;
        });
    }

    /** 分页改变 */
    function paginateChange(n: number) {
      if (loading.value) {
        return;
      }
      paginate.page = n;
      findBlog();
    }

    /** 添加博客 */
    function addBlog(_id: number = -1) {
      ifAddBlog.value = true;
      editBlogId.value = _id;
    }

    /** 添加博客回调 */
    function change(_op: {
      type: "add" | "edit";
      data: EN.IBlogE;
      id: number;
    }) {
      if (_op.type == "add") {
        blogDatas.value.unshift(_op.data);
      } else {
        let index = blogDatas.value.findIndex((item) => {
          return item.id == _op.id;
        });
        blogDatas.value.splice(index, 1, _op.data);
      }
    }

    onMounted(() => {
      loadTabs();
    });

    return {
      ifLogin,
      loading,
      blogDatas,
      paginate,
      query,
      ifAddBlog,
      findBlog,
      paginateChange,
      addBlog,
      change,
      editBlogId,
      queryTags,
      loadingTabs,
    };
  },
};
</script>

<template>
  <div class="blog">
    <AddBlog v-model:show="ifAddBlog" @change="change" :id="editBlogId" />
    <div class="content" v-loading="loading">
      <div class="query">
        <el-input
          clearable
          placeholder="输入要查找的博客"
          v-model="query.str"
          @change="findBlog(true)"
        />
        <my-button @click="findBlog(true)">查找</my-button>
        <my-button type="e" @click="addBlog()" v-if="ifLogin">添加</my-button>
      </div>
      <div class="tags" v-loading="loadingTabs" v-if="queryTags.length > 0">
        <TabItem
          class="item"
          v-for="(item, index) in queryTags"
          :key="index"
          :data="item"
        />
      </div>
      <div class="blogList">
        <BlogItem
          class="item"
          v-for="(item, index) in blogDatas"
          :data="item"
          :key="index"
          @edit="addBlog(item.id)"
        />
      </div>
      <my-null v-if="!loading && blogDatas.length <= 0" />
      <Paginate :paginate="paginate" class="page" @change="paginateChange" />
    </div>
    <div class="right">
      <AllBlogTabs class="tabs" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog {
  --tabs-width: 200px;
  --tabs-margin-left: 20px;
  display: flex;
  flex-direction: row;
  > .content {
    display: flex;
    flex-direction: column;
    width: calc(100% - var(--tabs-width) - var(--tabs-margin-left));
    > .query {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 10px;
      > .el-input {
      }
      > button {
        margin-left: 20px;
        width: 100px;
        height: 100%;
      }
    }
    > .tags {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      > .item {
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
    > .blogList {
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
      justify-content: flex-end;
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
      background-color: white;
    }
  }
}
</style>
