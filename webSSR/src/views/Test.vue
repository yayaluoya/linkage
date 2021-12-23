<script lang="ts">
import { ref, reactive, defineComponent } from "vue";
import { useTestStore } from "@/store/modules/test";
import { storeToRefs } from "pinia";
import { parseAsyncComOp } from "@/erect/AsyncComType";
import { SSROpT } from "@/erect/SSROpT";
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
  // components: {},
  setup() {
    const testStore = useTestStore();
    return {
      c: storeToRefs(testStore).counter,
      asyncD: "",
    };
  },
});
</script>

<template>
  <div class="root">
    测试页面
    <span>测试store{{ c }}</span>
    <span>异步数据-{{ asyncD }}</span>
  </div>
</template>

<style scoped lang="scss">
.root {
}
</style>
