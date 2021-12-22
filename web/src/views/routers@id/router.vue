<script lang="ts">
import { ref, reactive } from "vue";
import { RouterTool } from "@/router/RouterTool";
import { RouteMeta, useRoute } from "vue-router";

/** 路由meta */
export const meta: RouteMeta | Promise<RouteMeta> = Promise.resolve({
  v: [],
  navName: "router页面",
  ifShow: false,
});

export default {
  components: {},
  setup() {
    const route = useRoute();
    return {};
  },
};
</script>

<template>
  <div class="root">层级路由子路由</div>
</template>

<style scoped lang="scss">
.root {
}
</style>
