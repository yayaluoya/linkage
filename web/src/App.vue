<script lang="ts">
export default {
  components: {},
  setup() {
    return {};
  },
};
</script>

<template>
  <div class="root">
    <div class="content">
      <router-view v-slot="{ Component }">
        <!-- 注意：这里加缓存有些不好形容的问题，跟vue-router的工作原理有关系 -->
        <!-- <keep-alive> -->
        <component :is="Component" />
        <!-- </keep-alive> -->
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.root {
  width: 100%;

  > .se {
    z-index: 0;
  }

  > .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
  }
}
</style>
