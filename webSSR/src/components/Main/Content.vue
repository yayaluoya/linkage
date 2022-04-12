<script lang="ts">
import { ref, reactive } from "vue";
export default {
  components: {},
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="content">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.content {
  width: var(--content-width);
  margin-top: var(--head-heigin);
  min-height: calc(100vh - var(--head-heigin) - 40px);
  padding: 20px 0;
}
</style>
