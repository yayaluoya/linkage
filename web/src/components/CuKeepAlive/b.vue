<script lang="ts">
import { ref, reactive } from "vue";
export default {
  components: {},
  setup() {
    const value = ref("b");
    return {
      value,
    };
  },
};
</script>

<template>
  <div class="b">
    <h1>{{ value }}</h1>
    <input v-model="value" />
  </div>
</template>

<style scoped lang="scss">
.b {
}
</style>
