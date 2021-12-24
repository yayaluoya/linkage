<script lang="ts">
import { ref, reactive, watch, toRef, computed } from "vue";
import Erect from "./Erect.vue";
import MDShow from "./MDShow.vue";
import marked from "-/marked";
export default {
  components: { Erect, MDShow },
  props: {
    md: {
      type: String,
      default: "",
    },
  },
  emits: ["update:md"],
  setup(props, ctx) {
    const input = computed(() => {
      return props.md;
    });
    const md_ = computed(() => {
      return marked.parse(input.value);
    });

    /** input值变化 */
    function inputChange(e: any) {
      ctx.emit("update:md", e.target.value);
    }

    //
    return {
      input,
      md_,
      inputChange,
    };
  },
};
</script>

<template>
  <Erect class="root">
    <div class="left">
      <textarea :value="input" @input="inputChange"></textarea>
    </div>
    <MDShow class="right" :content="md_" />
    <template #s>
      <span>MD编辑器SSR</span>
    </template>
  </Erect>
</template>

<style scoped lang="scss">
.root {
  display: flex;
  flex-direction: row;
  --min-height: 200px;
  --max-height: 600px;
  > .left {
    width: 50%;
    > textarea {
      width: 100%;
      height: 100%;
      min-height: var(--min-height);
      max-height: var(--max-height);
      border: none;
      outline: none;
    }
  }
  > .right {
    width: 50%;
    height: 100%;
    min-height: var(--min-height);
    max-height: var(--max-height);
    overflow: auto;
  }
}
</style>
