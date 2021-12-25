<script lang="ts">
import { ref, reactive, computed, onMounted, watch, toRef } from "vue";
import Erect from "./Erect.vue";
import marked, { getHighlightThemeStyleEl } from "-/marked";

/** 默认主题 */
const defaultTheme = "atom-one-dark";
export default {
  components: { Erect },
  props: {
    /** md字符串 */
    content: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      default: defaultTheme,
    },
  },
  setup(props) {
    const mdRef = ref<Element>();
    /** el */
    let mdRootEl: ShadowRoot;
    let mdShowEl: Element;
    let themeEl: Element;
    //监听props的变化
    watch(toRef(props, "content"), () => {
      setMd();
    });
    watch(toRef(props, "theme"), () => {
      setTheme();
    });
    //获取影子dom或者原dom
    onMounted(() => {
      mdRootEl =
        mdRef.value?.attachShadow({
          mode: "open",
        }) || (mdRef.value! as any);
      mdShowEl = document.createElement("div");
      mdRootEl.appendChild(mdShowEl);
      //
      setTheme();
      setMd();
    });

    /** 设置md内容 */
    function setMd() {
      setTimeout(() => {
        mdShowEl.innerHTML = marked.parse(props.content);
      }, 100);
    }
    /** 设置主题 */
    function setTheme() {
      //先删除之前的主题
      themeEl && mdRootEl.removeChild(themeEl);
      let _theme = getHighlightThemeStyleEl(props.theme || defaultTheme);
      themeEl = _theme.linkEl;
      //根据不同的主题添加主题元素
      mdRootEl.appendChild(themeEl);
    }
    //
    return {
      mdRef,
    };
  },
};
</script>

<template>
  <Erect class="root">
    <div ref="mdRef"></div>
    <template #s>
      {{ content }}
    </template>
  </Erect>
</template>

<style scoped lang="scss">
.root {
  > div {
    width: 100%;
  }
}
</style>
