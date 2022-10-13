<script lang="ts">
import { ref, reactive, customRef, onMounted } from "vue";
import Dialog from ">/Dialog/Dialog.vue";
import MDShow from "../../MDShow.vue";
import { Mes } from "@/mes/Mes";
import { ComApiCon } from "@/http/apiCon/ComApiCon";
export default {
  components: { Dialog, MDShow },
  props: {
    show: {
      type: Boolean,
    },
  },
  emits: ["selectBack", "update:show"],
  setup(props, ctx) {
    const helpRef = ref();
    const content = ref("");
    const loading = ref(false);
    /** 一个自定义的ref */
    const show_ = customRef((track, trigger) => {
      return {
        get: () => {
          track();
          return props.show;
        },
        set: (_value) => {
          ctx.emit("update:show", _value);
          trigger();
        },
      };
    });

    /** 加载数据 */
    function loadData() {
      loading.value = true;
      ComApiCon.instance
        .getMdHelp()!
        .then((_str) => {
          content.value = _str;
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loading.value = false;
        });
    }

    onMounted(() => {
      loadData();
    });

    //
    return {
      helpRef,
      loading,
      show_,
      content,
    };
  },
};
</script>

<template>
  <Dialog v-model:show="show_" title="MD语法简介">
    <div class="help_" ref="helpRef" v-loading="loading">
      <MDShow :content="content" />
    </div>
  </Dialog>
</template>

<style scoped lang="scss">
.help_ {
  width: 600px;
  min-height: 100px;
  max-height: 400px;
  overflow: auto;
}
</style>
