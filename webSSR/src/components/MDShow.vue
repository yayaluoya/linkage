<script lang="ts">
import { ref, reactive, computed, onMounted, watch, toRef } from "vue";
import Erect from "./Erect.vue";
import marked, { getHighlightThemeStyleEl, getMDStyleEl } from "-/marked";

/** 默认md主题 */
const defaultMDTheme = "misty-light";
/** 默认代码主题 */
const defaultCodeTheme = "atom-one-dark";
export default {
  components: { Erect },
  props: {
    /** md字符串 */
    content: {
      type: String,
      default: "",
    },
    md_theme: {
      type: String,
      default: defaultMDTheme,
    },
    code_theme: {
      type: String,
      default: defaultCodeTheme,
    },
  },
  setup(props) {
    const mdRef = ref<Element>();
    /** el */
    let mdRootEl: ShadowRoot;
    let mdShowEl: Element;
    let mdThemeEl: Element;
    let codeThemeEl: Element;
    //监听props的变化
    watch(toRef(props, "content"), () => {
      setMd();
    });
    watch(toRef(props, "md_theme"), () => {
      setMdTheme();
    });
    watch(toRef(props, "code_theme"), () => {
      setCodeTheme();
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
      setMdTheme();
      setCodeTheme();
      setMd();
    });

    /** 设置md内容 */
    function setMd() {
      mdShowEl.innerHTML = marked.parse(props.content);
    }
    /** 设置md主题 */
    function setMdTheme() {
      //先删除之前的主题
      mdThemeEl && mdRootEl.removeChild(mdThemeEl);
      let _theme = getMDStyleEl(props.md_theme || defaultMDTheme);
      mdThemeEl = _theme.linkEl;
      //根据不同的主题添加主题元素
      mdRootEl.appendChild(mdThemeEl);
    }
    /** 设置代码主题 */
    function setCodeTheme() {
      //先删除之前的主题
      codeThemeEl && mdRootEl.removeChild(codeThemeEl);
      let _theme = getHighlightThemeStyleEl(
        props.code_theme || defaultCodeTheme
      );
      codeThemeEl = _theme.linkEl;
      //根据不同的主题添加主题元素
      mdRootEl.appendChild(codeThemeEl);
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
