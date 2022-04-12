<script lang="ts">
import { ref, reactive, toRef, watch, onMounted } from "vue";
/** List类型 */
interface IList {
  /** 标题 */
  title: string;
  /** 插槽 */
  slot: string;
}
export default {
  components: {},
  props: {
    /** 列表 */
    list: {
      type: Array,
      default: [],
    },
    /** 索引 */
    index: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:index", "change"],
  setup(props, ctx) {
    /** 选项点击 */
    function itemClick(_index: number) {
      if (props.index == _index) {
        return;
      }
      ctx.emit("change", _index);
      ctx.emit("update:index", _index);
    }

    //
    return {
      itemClick,
    };
  },
};
</script>

<template>
  <div class="tabs_" ref="tabsRef">
    <div
      class="item"
      :class="{
        on: index == _index,
      }"
      @click="itemClick(_index)"
      v-for="(item, _index) in list"
      :key="_index"
    >
      <span class="title" v-if="!item.slot">
        {{ item.title }}
      </span>
      <slot
        v-if="item.slot"
        :name="item.slot"
        :item="item"
        :on="index == _index"
      >
        插槽内容
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs_ {
  --color: #999;
  --on-color: #999;
  --background-color: #f6f6f6;
  --on-background-color: #fff;
  --font-size: 16px;
  --padding: 5px 15px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: end;
  border-bottom: 1px solid var(--border-color);
  overflow: hidden;
  > .item {
    margin-right: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: var(--color);
    font-size: var(--font-size);
    padding: var(--padding);
    border: 1px solid var(--border-color);
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    background-color: var(--background-color);
    backdrop-filter: blur(50px);
    margin-bottom: -1px;
    cursor: pointer;
    transition: all 0.2s;
    > .title {
      transition: all 0.2s;
    }
    &.on {
      background-color: var(--on-background-color);
      > .title {
        font-weight: bold;
        color: var(--on-color);
      }
    }
  }
  > .item:nth-last-child(1) {
    margin-left: 0;
  }
}
</style>
