<script lang="ts">
import { ref, reactive, customRef, computed, watch, toRef } from "vue";
import Dialog from ">/Dialog/Dialog.vue";
import { ElForm } from "element-plus";
import { FormItemRule } from "element-plus/es/components/form/src/form.type";
import { ComVerify } from "com_utils/ComVerify";
import { byStrGetTheme } from "@/components/md/MDTheme";
import { AdminApiCon } from "@/http/apiCon/main/AdminApiCon";
import { Mes } from "@/mes/Mes";
import MDEdit from ">/md/MDEdit.vue";
export default {
  components: { Dialog, MDEdit },
  props: {
    show: {
      type: Boolean,
    },
    conData: {
      type: Object,
    },
  },
  emits: ["update:show", "edit"],
  setup(props, ctx) {
    const conData = computed<ToolN.DataCon<EN.IMemoE>>(() => {
      return props.conData as any;
    });
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
    const formRef = ref<InstanceType<typeof ElForm>>();
    const formRules: Record<
      Extract<"title" | "content", keyof EN.IMemoE>,
      FormItemRule
    > = {
      title: {
        required: true,
        validator: (rule, value, callback) => {
          callback(ComVerify.MemoV.title(value) || undefined);
        },
      },
      content: {
        required: true,
        validator: (rule, value, callback) => {
          callback(ComVerify.MemoV.content(value) || undefined);
        },
      },
    };
    const model = reactive<
      Pick<EN.IMemoE, "title" | "content" | "x" | "y"> & {
        theme: {
          md: string;
          code: string;
        };
      }
    >({
      title: "",
      content: "",
      theme: {
        md: "",
        code: "",
      },
      x: 10,
      y: 60,
    });

    const ifEdit = computed(() => {
      return conData.value.type == "edit";
    });

    watch(toRef(props.conData!, "type"), () => {
      if (conData.value.type == "edit") {
        model.title = conData.value.data?.title!;
        model.content = conData.value.data?.content!;
        model.theme = byStrGetTheme(conData.value.data?.theme);
        model.x = parseInt(conData.value.data?.x! + "");
        model.y = parseInt(conData.value.data?.y! + "");
      } else {
        model.title = "";
        model.content = "";
        model.theme = {
          md: "",
          code: "",
        };
        model.x = 10;
        model.y = 60;
      }
    });

    /** 提交 */
    function submit() {
      if (addLoading.value) {
        return;
      }
      formRef.value
        ?.validate()
        ?.then(() => {
          addLoading.value = true;
          let p: Promise<EN.IMemoE>;
          let _op = {
            title: model.title,
            content: model.content,
            theme: model.theme as any,
            x: model.x,
            y: model.y,
          };
          if (ifEdit.value) {
            p = AdminApiCon.instance
              .editMemo({
                id: conData.value.data?.id!,
                ..._op,
              })
              .then((d) => {
                Mes.success("编辑成功");
                return d;
              });
          } else {
            p = AdminApiCon.instance
              .addMemo({
                ..._op,
              })
              .then((d) => {
                Mes.success("添加成功");
                return d;
              });
          }
          //
          p.finally(() => {
            addLoading.value = false;
          })
            .then((d) => {
              show_.value = false;
              ctx.emit("edit", {
                type: conData.value.type,
                data: d,
              });
            })
            .catch(Mes.handleHttpCatch);
        })
        .catch(Mes.handleFormCatch);
    }
    return {
      show_,
      ifEdit,
      submit,
      formRef,
      formRules,
      model,
      addLoading,
    };
  },
};
</script>

<template>
  <Dialog v-model:show="show_" :title="(ifEdit ? '编辑' : '添加') + '便签'">
    <div class="addMemo">
      <el-form
        :model="model"
        ref="formRef"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="model.title" placeholder="请输入便签标题" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <MDEdit
            v-model:md="model.content"
            v-model:md_theme="model.theme.md"
            v-model:code_theme="model.theme.code"
          />
        </el-form-item>
        <el-form-item label="位置x:">
          <el-input-number v-model="model.x" />
        </el-form-item>
        <el-form-item label="位置y:">
          <el-input-number v-model="model.y" />
        </el-form-item>
      </el-form>
    </div>
    <template #bottom>
      <my-button :loading="addLoading" type="e" @click="submit">{{
        ifEdit ? "保存" : "添加"
      }}</my-button>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.addMemo {
  width: 600px;
}
</style>