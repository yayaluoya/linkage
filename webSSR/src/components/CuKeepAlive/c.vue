<script lang="ts">
import { ref, reactive } from "vue";
export default {
  components: {},
  setup() {
    const value = ref("c");
    return {
      value,
    };
  },
};
</script>

<template>
  <div class="c">
    <h1>{{ value }}</h1>
    <input v-model="value" />
  </div>
</template>

<style scoped lang="scss">
.c {
}
</style>
