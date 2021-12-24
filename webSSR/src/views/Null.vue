<script lang="ts">
import { ref, reactive } from "vue";
import { SSROpT } from "@/erect/SSROpT";
export default {
  ...SSROpT.inject({
    asyncHeadLabel() {
      return {
        title: "空页面",
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
  <div class="root">404</div>
</template>

<style scoped lang="scss">
.root {
}
</style>
