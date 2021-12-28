<script lang="ts">
import { defineComponent, onMounted } from "@vue/runtime-core";
import { useMainStore } from "@/store/modules/main";
import { storeToRefs } from "pinia";
import { TestDataProxy } from "@/localData/dataItem/TestDataProxy";
import { TestApiCon } from "@/http/apiCon/TestApiCon";
import { RouteRecordRawExport, useRoute } from "vue-router";
import { Env } from "@/_d/Env";
import { Gzip } from "-/Zip";

/** 路由配置 */
export const routeExportRaw: RouteRecordRawExport = {
  meta: {
    v: [],
    navName: "测试页面",
    ifShow: false,
  },
};

export default defineComponent({
  setup() {
    let mainStore = useMainStore();
    const route = useRoute();
    setInterval(() => {
      mainStore.counter++;
    }, 1000);

    onMounted(() => {
      TestApiCon.instance
        .testPost()
        .then((data) => {
          console.log("请求数据", data);
        })
        .catch(({ mes }) => {
          console.error(mes);
        });

      console.log("路由配置", route.meta);

      console.log("env配置数据", Env.env);

      console.log("压缩数据", Gzip.gzip("哈哈哈哈"));
    });

    return {
      counter: storeToRefs(mainStore).counter,
      doubleCount: storeToRefs(mainStore).doubleCount,
      testData: TestDataProxy.instance.data,
    };
  },
});
</script>

<template>
  <div>
    <h1>测试页面</h1>
    {{ counter }}-{{ doubleCount }}
    {{ testData.a }}
    <svg-icon name="link" />
  </div>
</template>

<style></style>
