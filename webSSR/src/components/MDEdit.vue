<script lang="ts">
import { ref, reactive } from "vue";
import Erect from "./Erect.vue";
export default {
  components: { Erect },
  setup() {
    return {};
  },
};
</script>

<template>
  <Erect class="root">
    <h1>md编辑器</h1>
    <template #s>
      <span>MD编辑器SSR</span>
    </template>
  </Erect>
</template>

<style scoped lang="scss">
.root {
}
</style>
