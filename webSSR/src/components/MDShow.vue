<script lang="ts">
import { ref, reactive, computed, onMounted, watch, toRef } from "vue";
import Erect from "./Erect.vue";
import { marked } from "marked";
import hljs from "highlight.js"; // 引入 highlight.js
// import "highlight.js/styles/github.css"; // 引入高亮样式
import "highlight.js/styles/atom-one-dark.css"; // 引入高亮样式
var rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  highlight: function (code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});
export default {
  components: { Erect },
  props: {
    /** md字符串 */
    content: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const mdContent = ref("");
    //监听props的变化
    watch(toRef(props, "content"), () => {
      setMd();
    });
    onMounted(() => {
      setMd();
    });

    /** 设置md内容 */
    function setMd() {
      //TODO 这里有个大bug，就是必须在下一个宏任务中执行
      setTimeout(() => {
        mdContent.value = marked.parse(props.content);
      }, 0);
    }
    return {
      mdContent,
    };
  },
};
</script>

<template>
  <Erect class="root">
    <div v-html="mdContent"></div>
    <template #s>
      {{ content }}
    </template>
  </Erect>
</template>

<style scoped lang="scss">
.root {
}
</style>
