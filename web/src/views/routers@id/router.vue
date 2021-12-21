<script lang="ts">
import { ref, reactive } from "vue";
import { RouterTool } from "@/router/RouterTool";
import { useRoute } from "vue-router";
import { IRouterMata } from "@/router/RouterType";

/** 路由meta */
export const meta: IRouterMata = {
  v: [],
  navName: "router页面",
  ifShow: false,
};

export default {
  components: {},
  setup() {
    const route = useRoute();
    //查看所有路由
    RouterTool.getMate(route.path).then((item) => {
      console.log("当前页面路由信息", route.path, route.name, item);
    });
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
