<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from "vue";
import { useTestStore } from "@/store/modules/test";
import { storeToRefs } from "pinia";
import { parseAsyncComOp } from "@/erect/AsyncComType";
import HelloWorld from ">/HelloWorld.vue";
import MDEdit from ">/md/MDEdit.vue";
import { SSROpT } from "@/erect/SSROpT";
import { RouteRecordRawExport, useRoute } from "vue-router";
import { Env } from "@/_d/Env";
import tabs_ from ">/tabs/tabs.vue";
import tabs2_ from ">/tabs/tabs2.vue";
import Dialog_ from ">/Dialog/Dialog.vue";
import imgSelect from ">/imgSelect/imgSelect.vue";
import { TestApiCon } from "@/http/apiCon/TestApiCon";
import VList from ">/vList/VList.vue";
import waterfallList from ">/waterfallList/waterfallList.vue";
import State from ">/State/State.vue";
import BlogItem from ">/Blog/BlogItem.vue";
import { ComApiCon } from "@/http/apiCon/main/ComApiCon";
import { headImg } from "@/const/headImg";
import { AdminApiCon } from "@/http/apiCon/main/AdminApiCon";
import { Mes } from "@/mes/Mes";
import CuKeepAliveTest from ">/CuKeepAlive/test.vue";

/** 路由配置 */
export const routeExportRaw: RouteRecordRawExport = {
  meta: {
    v: [],
    navName: "测试页面哈哈哈哈",
    ifShow: false,
  },
};

export default defineComponent({
  //注入ssr异步依赖
  ...SSROpT.inject({
    async asyncData(_op: parseAsyncComOp) {
      return {
        asyncD: "异步获取的数据",
      };
    },
    async asyncHeadLabel(_op: parseAsyncComOp) {
      return {
        title: "vite测试页面哈哈哈哈---",
      };
    },
  }),
  components: {
    HelloWorld,
    MDEdit,
    tabs_,
    tabs2_,
    Dialog_,
    imgSelect,
    VList,
    waterfallList,
    State,
    BlogItem,
    CuKeepAliveTest,
  },
  setup() {
    const testStore = useTestStore();
    const md = reactive({
      title: "",
      content: "",
      mdTheme: "",
      codeTheme: "",
    });
    const route = useRoute();
    const tabList = ref<any[]>([
      {
        title: "tab1",
      },
      {
        title: "tab3",
      },
      {
        title: "tab4",
      },
      {
        title: "tab5",
      },
    ]);
    const tabIndex = ref(0);
    const showDialog = ref(false);
    const img = ref("");
    const state = reactive({
      loading: false,
      loadCom: false,
      null: false,
    });

    setTimeout(() => {
      md.content = "1秒后\n## 哈哈哈哈哈\n```ts\nconsole.log('哈哈哈哈');\n```";
      //
      Env.ifC && console.log("路由配置", route.meta);
    }, 1000);

    function onClick() {
      console.log("点击");
    }

    onMounted(() => {
      TestApiCon.instance
        .testPost({
          1: "a",
          2: "b",
        })
        .then((d) => {
          console.log("测试接口post", d);
        });
      TestApiCon.instance
        .testGet({
          1: "b哈哈哈",
          2: "b哈哈哈",
        })
        .then((d) => {
          console.log("测试接口get", d);
        });
    });

    /** 虚拟列表 */
    const vList = ref(
      Array.from({
        length: 50,
      }).map((_, index) => {
        return {
          height: index,
          id: index,
          img: headImg,
          title: "哈哈哈哈" + index,
        };
      })
    );

    function touchBottom() {
      console.log("加载数据", state);
      if (state.loading) {
        return;
      }
      state.loading = true;
      setTimeout(() => {
        state.loading = false;
        vList.value.push(
          ...Array.from({
            length: 20,
          }).map((_, index) => {
            return {
              height: index,
              id: index,
              img: headImg,
              title: "哈哈哈哈" + index,
            };
          })
        );
      }, 500);
    }

    /** 添加博客 */
    function addBlog() {
      AdminApiCon.instance
        .addBlog({
          title: md.title,
          content: md.content,
          theme: {
            md: md.mdTheme,
            code: md.codeTheme,
          },
          tabIds: "1,2,3",
        })
        .then((data) => {
          blogDatas.value.unshift(data);
        })
        .catch(Mes.handleHttpCatch);
    }

    const blogDatas = ref<any[]>([]);
    onMounted(() => {
      ComApiCon.instance
        .findBlog({
          size: 999,
          page: 1,
          query: {},
        })
        .then((data) => {
          blogDatas.value = data.list;
        });
    });

    return {
      c: storeToRefs(testStore).counter,
      asyncD: "",
      md,
      tabList,
      tabIndex,
      showDialog,
      img,
      onClick,
      vList,
      state,
      touchBottom,
      blogDatas,
      addBlog,
    };
  },
});
</script>

<template>
  <div class="test">
    测试页面
    <router-link to="/home">首页</router-link>
    <!-- <tabs_ :list="tabList" v-model:index="tabIndex" /> -->
    <CuKeepAliveTest v-if="false" />
    <el-input v-if="false" v-model="md.title" />
    <MDEdit
      v-if="false"
      style="width: 100%; margin-top: 20px"
      v-model:md="md.content"
      v-model:md_theme="md.mdTheme"
      v-model:code_theme="md.codeTheme"
    />
    <my-button @click="addBlog" v-if="false">添加博客</my-button>
    <waterfallList
      v-if="false"
      :list="vList"
      :state="state"
      :style="{
        width: '100%',
        height: '500px',
      }"
      @touchBottom="touchBottom"
      #default="{ item, index }"
    >
      <div class="v_list_item">
        <div
          :style="{
            width: '100%',
            height: `${item.height}px`,
          }"
        ></div>
        <img :src="item.img" alt="" />
        <span>{{ item.title }}-{{ index }}</span>
      </div>
    </waterfallList>
    <VList
      v-if="false"
      :list="vList"
      :state="state"
      :style="{
        width: '100%',
        height: '500px',
      }"
      :getExtraHeight="
        (item) => {
          return item.height;
        }
      "
      @touchBottom="touchBottom"
      #default="{ item, index }"
    >
      <div class="v_list_item">
        <div
          :style="{
            width: '100%',
            height: `${item.height}px`,
          }"
        ></div>
        <img :src="item.img" alt="" />
        <span>{{ item.title }}-{{ index }}</span>
      </div>
    </VList>
    <div class="blogList" v-if="false">
      <BlogItem v-for="(item, index) in blogDatas" :data="item" :key="index" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.test {
  display: flex;
  flex-direction: column;
  .v_list_item {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin-top: 10px;
    > img {
      width: 50px;
      height: 50px;
    }
  }
  .blogList {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
