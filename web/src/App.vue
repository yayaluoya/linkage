<script lang="ts">
import { defineComponent } from "vue-demi";
import Layout from ">/Layout.vue";
export default defineComponent({
  components: {
    Layout,
  },
});
</script>

<template>
  <Layout>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </Layout>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
