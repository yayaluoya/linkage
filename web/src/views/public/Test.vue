<script lang="ts">
import { ref, reactive } from "vue";
import MDEdit from ">/md/MDEdit.vue";
import ColorPicker from ">/ColorPicker/ColorPicker.vue";
import Tabs from ">/tabs/tabs.vue";
import Tabs2 from ">/tabs/tabs2.vue";
export default {
  components: { MDEdit, ColorPicker, Tabs, Tabs2 },
  props: {},
  setup(props, ctx) {
    const md = ref("哈哈哈");
    const color = ref("red");
    const onTab = ref(0);
    const tabsList = [
      { title: "哈哈" },
      { title: "哈哈哈哈" },
      { title: "哈哈哈哈哈哈" },
    ];
    return {
      md,
      color,
      tabsList,
      onTab,
    };
  },
};
</script>

<template>
  <div class="test">
    测试页面
    <MDEdit v-model:md="md" />
    <Tabs :list="tabsList" v-model:index="onTab" />
    <Tabs2 :list="tabsList" v-model:index="onTab" />
    <ColorPicker v-model:color="color" />
    <my-button>哈哈哈</my-button>
    <my-button type="e">哈哈哈</my-button>
  </div>
</template>

<style scoped lang="scss">
.test {
}
</style>