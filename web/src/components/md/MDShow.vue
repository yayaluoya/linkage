<script lang="ts">
import { ref, reactive, computed, onMounted, watch, toRef } from "vue";
import marked, { getHighlightThemeStyleEl, getMDStyleEl } from "-/marked";

/** 默认md主题 */
const defaultMDTheme = "misty-light";
/** 默认代码主题 */
const defaultCodeTheme = "atom-one-dark";
export default {
  components: {},
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
    /** md相关el */
    let mdHeadEl: HTMLHeadElement;
    let mdBodyEl: HTMLBodyElement;
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
    //在影子dom上挂载一个html页面，并暴露出页面head和body
    onMounted(() => {
      let shadowRoot =
        mdRef.value?.attachShadow({
          mode: "open",
        }) || (mdRef.value! as any);
      let htmlEl = document.createElement("html");
      shadowRoot.appendChild(htmlEl);
      let headEl = document.createElement("head");
      let bodyEl = document.createElement("body");
      htmlEl.appendChild(headEl);
      htmlEl.appendChild(bodyEl);
      //
      mdHeadEl = headEl;
      mdBodyEl = bodyEl;
      //
      addDefTheme();
      setMdTheme();
      setCodeTheme();
      setMd();
    });

    /** 设置md内容 */
    function setMd() {
      mdBodyEl.innerHTML = marked.parse(props.content);
    }
    /** 添加默认主题 */
    function addDefTheme() {
      mdHeadEl.appendChild(getMDStyleEl("index").linkEl);
    }
    /** 设置md主题 */
    function setMdTheme() {
      //先删除之前的主题
      mdThemeEl && mdHeadEl.removeChild(mdThemeEl);
      let _theme = getMDStyleEl(props.md_theme || defaultMDTheme);
      mdThemeEl = _theme.linkEl;
      //根据不同的主题添加主题元素
      mdHeadEl.appendChild(mdThemeEl);
    }
    /** 设置代码主题 */
    function setCodeTheme() {
      //先删除之前的主题
      codeThemeEl && mdHeadEl.removeChild(codeThemeEl);
      let _theme = getHighlightThemeStyleEl(
        props.code_theme || defaultCodeTheme
      );
      codeThemeEl = _theme.linkEl;
      //根据不同的主题添加主题元素
      mdHeadEl.appendChild(codeThemeEl);
    }
    //
    return {
      mdRef,
    };
  },
};
</script>

<template>
  <div class="mdShow">
    <div ref="mdRef"></div>
  </div>
</template>

<style scoped lang="scss">
.mdShow {
  overflow: hidden;
  > div {
    width: 100%;
  }
}
</style>
