<script lang="ts">
import { ref, reactive } from "vue";
import { Env } from "@/_d/Env";
/**
 * 多端内容分发
 * 默认插槽在c端
 */
export default {
  components: {},
  setup() {
    /** 是否在c端 */
    const ifC = Env.ifC;
    /** 是否在s端 */
    const ifS = Env.ifS;
    return {
      ifC,
      ifS,
    };
  },
};
</script>

<template>
  <slot v-if="ifC" />
  <slot name="s" v-if="ifS" />
</template>

<style scoped lang="scss">
.erect__ {
}
</style>
