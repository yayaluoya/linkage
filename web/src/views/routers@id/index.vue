<script lang="ts">
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
export default {
  components: {},
  setup() {
    const route = useRoute();
    console.log("路由参数", route.params);
    return {};
  },
};
</script>

<template>
  <div class="root">
    层级路由默认页面
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.root {
}
</style>
