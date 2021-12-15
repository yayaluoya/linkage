<script lang="ts">
import { defineComponent, onMounted } from "@vue/runtime-core";
import { useMainStore } from "@/store/modules/main";
import { storeToRefs } from "pinia";
import { TestDataProxy } from "@/localData/dataItem/TestDataProxy";
import { TestApiCon } from "@/http/apiCon/TestApiCon";
export default defineComponent({
  setup() {
    let mainStore = useMainStore();
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

<style>
</style>