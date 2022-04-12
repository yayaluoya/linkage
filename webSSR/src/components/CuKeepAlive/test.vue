<script lang="ts">
import { ref, reactive } from "vue";
import CuKeepAlive from "./CuKeepAlive.vue";

import A from "./a.vue";
import B from "./b.vue";
import C from "./c.vue";

const comList = {
  a: A,
  b: B,
  c: C,
};

export default {
  components: {
    CuKeepAlive,
  },
  setup() {
    const key = ref("a");
    const keys = Object.keys(comList);
    return {
      comList,
      key,
      keys,
    };
  },
};
</script>

<template>
  <div class="keepAliveTest">
    <my-button v-for="(item, index) in keys" :key="index" @click="key = item"
      >切换到{{ item }}</my-button
    >
    <span>当前组件{{ key }}</span>
    <CuKeepAlive :com_list="comList" :com_key="key" />
  </div>
</template>

<style scoped lang="scss">
.keepAliveTest {
}
</style>
