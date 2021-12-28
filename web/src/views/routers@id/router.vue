<script lang="ts">
import { ref, reactive } from "vue";
import { RouterTool } from "@/router/RouterTool";
import { RouteMeta, RouteRecordRawExport, useRoute } from "vue-router";

/** 路由配置 */
export const routeExportRaw: Promise<RouteRecordRawExport> = Promise.resolve({
  meta: {
    v: [],
    navName: "路由测试页面",
    ifShow: false,
  },
});

export default {
  components: {},
  setup() {
    const route = useRoute();
    console.log("路由meta", route.meta);
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
