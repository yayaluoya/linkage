<script lang="ts">
import { ref, reactive } from "vue";
import MDEdit from ">/md/MDEdit.vue";
export default {
  components: { MDEdit },
  props: {},
  setup(props, ctx) {
    const md = ref("哈哈哈");
    return {
      md,
    };
  },
};
</script>

<template>
  <div class="test">
    测试页面
    <MDEdit :md="md" />
  </div>
</template>

<style scoped lang="scss">
.test {
}
</style>