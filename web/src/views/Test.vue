<script lang="ts">
import { defineComponent, onMounted } from "@vue/runtime-core";
import { useMainStore } from "@/store/modules/main";
import { storeToRefs } from "pinia";
import { TestDataProxy } from "@/localData/dataItem/TestDataProxy";
import { TestApiCon } from "@/http/apiCon/TestApiCon";
import { RouterTool } from "@/router/RouterTool";
import { IRouterMata } from "@/router/RouterType";
import { useRoute } from "vue-router";

/** 路由meta */
export const meta: IRouterMata = {
  v: [],
  navName: "测试页面",
  ifShow: false,
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

      //查看所有路由
      RouterTool.getMate(route.path).then((item) => {
        console.log("当前页面路由信息", route.path, item);
      });
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
  </div>
</template>

<style></style>
