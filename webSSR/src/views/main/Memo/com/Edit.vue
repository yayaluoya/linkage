<script lang="ts">
import { ref, reactive, customRef, computed, watch, toRef } from "vue";
import Dialog from ">/Dialog/Dialog.vue";
import { ElForm } from "element-plus";
import { FormItemRule } from "element-plus/es/components/form/src/form.type";
import { ComVerify } from "com_utils/ComVerify";
import { AdminApiCon } from "@/http/apiCon/main/AdminApiCon";
import { Mes } from "@/mes/Mes";
import { themeDataKey } from "../themeDataKey";
import WHImgSelect from ">/WHImgSelect/WHImgSelect.vue";
import ImgSelect_ from ">/imgSelect/imgSelect.vue";
import { SeList } from ">/Se/SeList";

export default {
  components: { Dialog, ImgSelect_, WHImgSelect },
  props: {
    show: {
      type: Boolean,
    },
    data: {
      type: Object,
    },
  },
  emits: ["update:show", "edit"],
  setup(props, ctx) {
    const addLoading = ref(false);
    /** 一个自定义的ref */
    const show_ = customRef((track, trigger) => {
      return {
        get: () => {
          track();
          return props.show;
        },
        set: (_value) => {
          if (addLoading.value) {
            return;
          }
          ctx.emit("update:show", _value);
          trigger();
        },
      };
    });
    const WHSelectImg = ref(false);
    const formRef = ref<InstanceType<typeof ElForm>>();
    const formRules: Record<
      Exclude<themeDataKey, "backgroundSe">,
      FormItemRule
    > = {
      backgroundImage: {
        required: true,
        validator: (rule, value, callback) => {
          callback(
            ComVerify.lengthV(model.backgroundImage, [1, 300], "背景图片") ||
              ComVerify.urlV(model.backgroundImage) ||
              undefined
          );
        },
      },
    };
    const model = reactive<Record<themeDataKey, any>>({
      backgroundImage: "",
      backgroundSe: [],
    });

    watch(toRef(props, "show"), () => {
      model.backgroundImage = props.data!.backgroundImage;
      model.backgroundSe = props.data!.backgroundSe;
    });

    /** 图片库选择图片回调 */
    function imgBaseSelectBack(image: string) {
      model.backgroundImage = image;
    }

    /** 提交 */
    function submit() {
      if (addLoading.value) {
        return;
      }
      formRef.value
        ?.validate()
        ?.then(() => {
          addLoading.value = true;
          AdminApiCon.instance
            .editUserMemo({
              memoData: JSON.stringify(model),
            })
            .then(() => {
              Mes.success("编辑成功");
              ctx.emit("edit", model);
            })
            .catch(Mes.handleHttpCatch)
            .finally(() => {
              addLoading.value = false;
            })
            .then(() => {
              show_.value = false;
            });
        })
        .catch(Mes.handleFormCatch);
    }
    return {
      show_,
      submit,
      formRef,
      formRules,
      model,
      addLoading,
      WHSelectImg,
      imgBaseSelectBack,
      SeList,
    };
  },
};
</script>

<template>
  <Dialog v-model:show="show_" title="编辑便签配置">
    <div class="editMemo">
      <el-form
        :model="model"
        ref="formRef"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="背景图片" prop="backgroundImage">
          <div class="imgselect">
            <ImgSelect_ v-model:img="model.backgroundImage" />
            <my-button @click="WHSelectImg = true">从图片库选择</my-button>
            <el-input type="text" v-model="model.backgroundImage" />
          </div>
        </el-form-item>
        <el-form-item label="背景特效">
          <el-checkbox-group v-model="model.backgroundSe">
            <el-checkbox-button
              v-for="item in SeList"
              :key="item.key"
              :label="item.key"
            >
              {{ item.name }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <template #bottom>
      <my-button :loading="addLoading" type="e" @click="submit">保存</my-button>
    </template>
    <WHImgSelect v-model:show="WHSelectImg" @selectBack="imgBaseSelectBack" />
  </Dialog>
</template>

<style scoped lang="scss">
.editMemo {
  width: 600px;
  .imgselect {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    > button {
      margin: 10px 0;
    }
  }
}
</style>
