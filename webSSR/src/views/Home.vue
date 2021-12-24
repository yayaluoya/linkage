<script lang="ts">
import { ref, reactive } from "vue";
import { SSROpT } from "@/erect/SSROpT";
export default {
  ...SSROpT.inject({
    asyncHeadLabel() {
      return {
        title: "首页",
      };
    },
  }),
  components: {},
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="root">主页</div>
</template>

<style scoped lang="scss">
.root {
}
</style>
