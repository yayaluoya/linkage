<script lang="ts">
import { ref, reactive, defineComponent } from "vue";
import { useTestStore } from "@/store/modules/test";
import { storeToRefs } from "pinia";
import { parseAsyncComOp } from "@/erect/AsyncComType";
import HelloWorld from ">/HelloWorld.vue";
import MDEdit from ">/MDEdit.vue";
import { SSROpT } from "@/erect/SSROpT";
import { RouteRecordRawExport, useRoute } from "vue-router";
import { Env } from "@/_d/Env";

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
  },
  setup() {
    const testStore = useTestStore();
    const mdContent = ref("");
    const route = useRoute();

    setTimeout(() => {
      mdContent.value =
        "1秒后\n## 哈哈哈哈哈\n```ts\nconsole.log('哈哈哈哈');\n```";
      //
      Env.ifC && console.log("路由配置", route.meta);
    }, 1000);

    return {
      c: storeToRefs(testStore).counter,
      asyncD: "",
      mdContent,
    };
  },
});
</script>

<template>
  <div class="root">
    测试页面
    <span>测试store{{ c }}</span>
    <span>异步数据-{{ asyncD }}</span>
    <HelloWorld msg="HelloWorld" />
    <MDEdit v-model:md="mdContent" />
    <svg-icon name="link" />
  </div>
</template>

<style scoped lang="scss">
.root {
  //
}
</style>
