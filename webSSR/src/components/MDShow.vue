<script lang="ts">
import { ref, reactive, computed, onMounted, watch, toRef } from "vue";
import Erect from "./Erect.vue";
import marked, { addHighlightClassFile } from "-/marked";
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
      default: "atom-one-dark",
    },
  },
  setup(props) {
    const mdContent = ref("");
    //添加主题
    addHighlightClassFile(props.theme);
    //监听props的变化
    watch(toRef(props, "content"), () => {
      setMd();
    });
    onMounted(() => {
      setMd();
      //
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
  > div {
    width: 100%;
  }
}
</style>
