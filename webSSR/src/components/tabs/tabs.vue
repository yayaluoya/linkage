<script lang="ts">
import { ref, reactive, toRef, watch, onMounted } from "vue";
import anime from "animejs/lib/anime.js";
import { EEasing } from "@/_d/EEasing";

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
    const tabsRef = ref<Element>();
    const vernierRef = ref<Element>();

    watch(toRef(props, "index"), () => {
      setVernier(200);
    });

    /** 选项点击 */
    function itemClick(_index: number) {
      if (props.index == _index) {
        return;
      }
      ctx.emit("change", _index);
      ctx.emit("update:index", _index);
    }

    /** 设置游标位置 */
    function setVernier(_aniTime = 0) {
      setTimeout(() => {
        let tabsRect = tabsRef.value!.getBoundingClientRect();
        let onItemRect = tabsRef
          .value!.querySelector(".item.on")!
          .getBoundingClientRect();
        anime({
          targets: vernierRef.value!,
          width: onItemRect.width,
          height: onItemRect.height,
          top: onItemRect.top - tabsRect.top,
          left: onItemRect.left - tabsRect.left,
          duration: _aniTime,
          easing: EEasing.linear,
        });
      }, 0);
    }

    onMounted(() => {
      setVernier();
    });

    //
    return {
      tabsRef,
      vernierRef,
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
      <slot v-if="item.slot" :name="item.slot" :on="index == _index" />
    </div>
    <div class="vernier" ref="vernierRef"></div>
  </div>
</template>

<style scoped lang="scss">
.tabs_ {
  --background-color: #efefef;
  --ver-color: #ffffff;
  --padding: 3px;
  --item-padding: 8px;
  --font-size: 14px;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  background-color: var(--background-color);
  padding: var(--padding);
  border-radius: var(--border-radius);
  color: var(--color);
  font-size: var(--font-size);
  position: relative;
  backdrop-filter: blur(5px);
  > .item {
    padding: var(--item-padding);
    margin-right: 5px;
    position: relative;
    z-index: 1;
    cursor: pointer;
    height: 10px;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    > .title {
      transition: all 0.2s;
    }
    &.on {
      > .title {
        font-weight: bold;
      }
    }
  }
  > .item:nth-last-child(2) {
    margin: 0;
  }
  > .vernier {
    position: absolute;
    background-color: var(--ver-color);
    z-index: 0;
    border-radius: var(--border-radius);
    box-shadow: 1px 1px 2px 0 rgb(0 0 0 / 5%);
  }
}
</style>
