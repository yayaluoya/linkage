<script lang="ts">
import { ref, reactive, watch } from "vue";
export default {
  components: {},
  setup() {
    const value_ = ref("a");
    watch(value_, () => {
      console.log("输入框值改变");
    });
    return {
      value_,
    };
  },
};
</script>

<template>
  <div class="a">
    <h1>{{ value_ }}</h1>
    <input v-model="value_" />
  </div>
</template>

<style scoped lang="scss">
.a {
}
</style>
