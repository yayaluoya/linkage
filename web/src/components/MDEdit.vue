<script lang="ts">
import { FileApiCon } from "@/http/apiCon/FileApiCon";
import { ApiTool } from "@/http/ApiTool";
import { defineComponent, ref, toRef, watch } from "vue-demi";

export default defineComponent({
  components: {},
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  emits: ["update:text"],
  setup(props, context) {
    const ifLoading = ref(false);
    const text_ = ref(props.text);

    watch(
      () => [props.text],
      () => {
        text_.value = props.text;
      }
    );
    watch(text_, () => {
      //传出事件
      context.emit("update:text", text_.value);
    });

    /** 上传图片 */
    function handleUploadImage(
      event: any,
      insertImage: Function,
      files: File[]
    ) {
      if (ifLoading.value) {
        insertImage({
          url: "",
          desc: "",
        });
        return;
      }
      ifLoading.value = true;
      FileApiCon.instance
        .update(files[0])
        .then((imageUrl) => {
          insertImage({
            url: ApiTool.getImageApi(imageUrl),
            desc: "",
            // width: 'auto',
            // height: 'auto',
          });
        })
        .finally(() => {
          ifLoading.value = false;
        });
    }

    return {
      ifLoading,
      text_,
      handleUploadImage,
    };
  },
});
</script>

<template>
  <v-md-editor
    v-model="text_"
    left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code"
    right-toolbar="preview toc sync-scroll"
    :disabled-menus="[]"
    @upload-image="handleUploadImage"
    height="400px"
  ></v-md-editor>
</template>

<style lang="sass" scoped></style>
