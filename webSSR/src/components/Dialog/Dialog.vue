<script lang="ts">
import { ref, reactive, watch, toRef, computed, useSlots } from "vue";
import { Env } from "@/_d/Env";
import { CloseBold } from "@element-plus/icons-vue";
import { Vector2 } from "@/utils/Vector2";
import anime from "animejs/lib/anime.js";
import { EEasing } from "@/_d/EEasing";

//创建dialog根元素
const dialogRootElId = "____dialog";
const mousePos: Vector2 = new Vector2();
let dialogRootEl: HTMLDivElement;
if (Env.ifC) {
  dialogRootEl = document.createElement("div");
  dialogRootEl.id = dialogRootElId;
  document.body.appendChild(dialogRootEl);
  //记录鼠标点击事件
  window.addEventListener("mousedown", (e) => {
    mousePos.x = e.x;
    mousePos.y = e.y;
  });
}

export default {
  components: { CloseBold },
  props: {
    title: {
      type: String,
      default: "标题",
    },
    show: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Number,
      default: 300,
    },
    margin_top: {
      type: Number,
      default: 50,
    },
  },
  emits: ["update:show"],
  setup(props, ctx) {
    const maskRef = ref<HTMLDivElement>();
    const contentRef = ref<HTMLDivElement>();
    const visibility = ref(props.show);
    const aniLoading = ref(false);
    const show_ = computed(() => {
      //如果有动画的话就必须处于显示状态
      if (aniLoading.value) {
        return true;
      }
      return props.show;
    });
    const slots = useSlots();
    const ifBottom = computed(() => {
      return !!slots.bottom;
    });
    watch(toRef(props, "show"), () => {
      if (props.show) {
        aniLoading.value = true;
        visibility.value = false;
        setTimeout(() => {
          let contentRect = contentRef.value?.getBoundingClientRect()!;
          let offsetV2 = new Vector2(
            mousePos.x - contentRect.x - contentRect.width / 2,
            mousePos.y - contentRect.y - contentRect.height / 2
          );
          //添加偏移
          contentRef.value!.style.transform = `translate(${offsetV2.x}px, ${offsetV2.y}px) scale(0)`;
          contentRef.value!.style.opacity = "0";
          maskRef.value!.style.opacity = "0";
          //
          visibility.value = true;
          //创建动画
          anime({
            targets: contentRef.value!,
            translateX: -offsetV2.x,
            translateY: -offsetV2.y,
            opacity: 1,
            duration: props.time,
            scale: 1,
            easing: EEasing.easeOutCubic,
            complete: () => {
              aniLoading.value = false;
            },
          });
          anime({
            targets: maskRef.value!,
            opacity: 1,
            duration: props.time,
            easing: EEasing.easeOutCubic,
          });
        }, 0);
      } else {
        aniLoading.value = true;
        visibility.value = true;
        //清空偏移
        contentRef.value!.style.transform = "";
        contentRef.value!.style.opacity = "1";
        maskRef.value!.style.opacity == "1";
        //创建动画
        anime({
          targets: contentRef.value!,
          opacity: 0,
          duration: props.time / 2,
          scale: 0,
          easing: EEasing.easeOutCubic,
          complete: () => {
            aniLoading.value = false;
            visibility.value = false;
          },
        });
        anime({
          targets: maskRef.value!,
          opacity: 0,
          duration: props.time / 2,
          easing: EEasing.easeOutCubic,
        });
      }
    });
    function close() {
      if (aniLoading.value) {
        return;
      }
      ctx.emit("update:show", false);
    }
    return {
      ifBottom,
      maskRef,
      contentRef,
      dialogRootElId,
      visibility,
      close,
      show_,
    };
  },
};
</script>

<template>
  <teleport :to="'#' + dialogRootElId">
    <div
      class="root"
      v-show="show_"
      :style="{
        visibility: visibility ? '' : 'hidden',
        '--margin-top': margin_top + 'px',
      }"
    >
      <div class="mask" ref="maskRef"></div>
      <div class="content" @click.stop="close">
        <div class="content" ref="contentRef" @click.stop="() => {}">
          <div class="top">
            <span>{{ title }}</span>
            <el-icon @click="close"><CloseBold /></el-icon>
          </div>
          <div class="content">
            <slot />
          </div>
          <div class="bottom" v-if="ifBottom">
            <slot name="bottom" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.root {
  --margin-top: 150px;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  > .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 0;
  }
  > .content {
    width: 100%;
    height: calc(100% - 100px);
    padding: 50px 0;
    overflow: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: start;
    z-index: 1;
    position: relative;
    > .content {
      margin-top: var(--margin-top);
      border-radius: 20px;
      border-radius: 6px;
      height: auto;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      > .top,
      > .bottom {
        background-color: rgb(250 250 250 / 92%);
        backdrop-filter: blur(50px);
      }
      > .top {
        width: calc(100% - 30px);
        border-bottom: 1px solid var(--border-color);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
        padding: 15px;
        color: var(--color);
        > .el-icon {
          cursor: pointer;
        }
      }
      > .content {
        // min-width: 400px;
        padding: 15px;
        background-color: rgb(255 255 255 / 96%);
        backdrop-filter: blur(50px);
      }
      > .bottom {
        width: calc(100% - 30px);
        padding: 15px;
        border-top: 1px solid var(--border-color);
        text-align: right;
      }
    }
  }
}
</style>
