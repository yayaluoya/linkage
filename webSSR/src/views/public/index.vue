<script lang="ts">
import { ref, reactive } from "vue";
import { Head, Content, Bottom } from ">/Main";
import { RouteRecordRawExport, useRoute } from "vue-router";
import { EPage } from "@/router/EPage";

/** 路由配置 */
export const routeExportRaw: RouteRecordRawExport = {
  redirect: EPage.Null,
};

export default {
  components: { Head, Content, Bottom },
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="com_">
    <Head />
    <Content>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </Content>
    <Bottom />
  </div>
</template>

<style scoped lang="scss">
.com_ {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
