<script lang="ts">
import { ref, reactive, defineComponent } from "vue";
import { Loading } from "@element-plus/icons-vue";
export default defineComponent({
  components: { Loading },
  props: {
    state: Object,
  },
  setup(props, ctx) {
    //
  },
});
</script>

<template>
  <div class="state____">
    <div v-if="!state.loading && state.loadCom && state.null">
      <slot name="null"> 空空如也 </slot>
    </div>
    <div v-if="!state.loading && state.loadCom && !state.null">
      <slot name="load_com"> 没有更多内容了 </slot>
    </div>
    <div v-if="state.loading">
      <slot name="loading">
        <el-icon style="margin-right: 10px"><Loading /></el-icon> 加载中...
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.state____ {
  width: 100%;
  padding: 10px 0;
  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #acacac;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
