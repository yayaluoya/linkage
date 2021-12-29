<script lang="ts">
import { ref, reactive, watch, toRef, computed, onMounted } from "vue";
import Erect from "../Erect.vue";
import MDShow from "./MDShow.vue";
import marked from "-/marked";
export default {
  components: { Erect, MDShow },
  props: {
    md: {
      type: String,
      default: "",
    },
    md_theme: {
      type: String,
      default: "",
    },
    code_theme: {
      type: String,
      default: "",
    },
  },
  emits: ["update:md", "update:md_theme", "update:code_theme"],
  setup(props, ctx) {
    const input = computed(() => {
      return props.md;
    });
    const mdContent = computed(() => {
      return marked.parse(input.value);
    });
    const textareaRef = ref<HTMLTextAreaElement>();
    /** 是否显示md */
    const ifShowMd = ref(false);

    /** input值变化 */
    function inputChange(e: any) {
      ctx.emit("update:md", e.target.value);
    }

    onMounted(() => {
      //
    });

    //
    return {
      input,
      mdContent,
      inputChange,
      textareaRef,
      ifShowMd,
    };
  },
};
</script>

<template>
  <Erect class="root">
    <div class="top"></div>
    <div
      class="content"
      :class="{
        showMd: ifShowMd,
      }"
    >
      <div class="left">
        <textarea
          ref="textareaRef"
          placeholder
          :value="input"
          @input="inputChange"
        ></textarea>
      </div>
      <MDShow
        class="right"
        :content="mdContent"
        :md_theme="md_theme"
        :code_theme="code_theme"
      />
    </div>
    <template #s>
      <span>MD编辑器SSR</span>
    </template>
  </Erect>
</template>

<style scoped lang="scss">
.root {
  width: 100%;
  display: flex;
  flex-direction: column;
  > .top {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
  > .content {
    display: flex;
    flex-direction: row;
    &.showMd {
      > .left {
        width: 50%;
      }
      > .right {
        width: 50%;
      }
    }
    &:not(.showMd) {
      > .left {
        width: 100%;
      }
      > .right {
        display: none;
      }
    }
    > .left {
      > textarea {
        width: 100%;
        max-height: 100%;
        resize: vertical;
        overflow: hidden;
        overflow-wrap: break-word;
        height: 200px;
        display: block;
        border: none;
        outline: none;
      }
    }
    > .right {
    }
  }
}
</style>
