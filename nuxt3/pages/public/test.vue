<script lang="ts">
import { ref, reactive } from "vue";
export default {
  components: {},
  props: {},
  setup(props, ctx) {
    const { data } = useAsyncData<{ a: number }>(
      "test_data",
      () => {
        return new Promise((r) => {
          setTimeout(() => {
            r({ a: 10 });
          }, 1000);
        });
      },
      {
        // lazy: true,
        default: () => {
          return { a: 0 };
        },
      }
    );
    return {
      data,
    };
  },
};
</script>

<template>
  <div class="test">
    <span>测试页面</span>
    <span>数字:{{ data.a }}</span>
  </div>
</template>

<style scoped lang="scss">
.test {
}
</style>