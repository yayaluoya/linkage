<script lang="ts">
import { ref, reactive, customRef, computed, watch, toRef } from "vue";
import Dialog from ">/Dialog/Dialog.vue";
import { ElForm } from "element-plus";
import { FormItemRule } from "element-plus/es/components/form/src/form.type";
import { ComVerify } from "com_utils/ComVerify";
import { Mes } from "@/mes/Mes";
import MDEdit from ">/md/MDEdit.vue";
import { AdminApiCon } from "@/http/apiCon/main/AdminApiCon";
import { byStrGetTheme } from "@/components/md/MDTheme";
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
    const conData = computed<ToolN.DataCon<EN.IDiaryE>>(() => {
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
      Extract<"title" | "content", keyof EN.IDiaryE> | "supplement",
      FormItemRule
    > = {
      title: {
        required: true,
        validator: (rule, value, callback) => {
          callback(ComVerify.DiaryV.title(value) || undefined);
        },
      },
      content: {
        required: true,
        validator: (rule, value, callback) => {
          callback(ComVerify.DiaryV.content(value) || undefined);
        },
      },
      supplement: {
        required: true,
        validator: (rule, value, callback) => {
          try {
            if (value) {
              callback(ComVerify.DiarySupplementV.content(value) || undefined);
            } else {
              callback(undefined);
            }
          } catch (e) {
            console.error(e);
          }
        },
      },
    };
    const model = reactive<
      Pick<EN.IDiaryE, "title" | "content" | "ifPublic"> & {
        theme: {
          md: string;
          code: string;
        };
      } & {
        supplement: Pick<EN.IDiarySupplementE, "content"> & {
          theme: {
            md: string;
            code: string;
          };
        };
      }
    >({
      title: "",
      content: "",
      ifPublic: false,
      theme: {
        md: "",
        code: "",
      },
      supplement: {
        content: "",
        theme: {
          md: "",
          code: "",
        },
      },
    });

    const ifEdit = computed(() => {
      return conData.value.type == "edit";
    });

    watch(toRef(props.conData!, "type"), () => {
      if (conData.value.type == "edit") {
        model.title = conData.value.data?.title!;
        model.content = conData.value.data?.content!;
        model.ifPublic = conData.value.data?.ifPublic!;
        model.theme = byStrGetTheme(conData.value.data?.theme);
      } else {
        model.title = "";
        model.content = "";
        model.ifPublic = false;
        model.theme = {
          md: "",
          code: "",
        };
        model.supplement.content = "";
        model.supplement.theme = {
          md: "",
          code: "",
        };
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
          let p: Promise<EN.IDiaryE>;
          if (ifEdit.value) {
            p = AdminApiCon.instance
              .editDiary({
                id: conData.value.data?.id!,
                ifPublic: model.ifPublic,
                supplement: model.supplement,
              })
              .then((d) => {
                Mes.success("编辑成功");
                return d;
              });
          } else {
            p = AdminApiCon.instance
              .addDiary({
                title: model.title,
                content: model.content,
                ifPublic: model.ifPublic,
                theme: model.theme as any,
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
      conData,
      ifEdit,
      addLoading,
      model,
      formRef,
      formRules,
      submit,
    };
  },
};
</script>

<template>
  <Dialog v-model:show="show_" :title="(ifEdit ? '编辑' : '添加') + '日记'">
    <div class="addDiary">
      <el-form
        :model="model"
        ref="formRef"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input
            :disabled="ifEdit"
            v-model="model.title"
            placeholder="请输入日记标题"
          />
        </el-form-item>
        <el-form-item label="内容" prop="content" v-if="!ifEdit">
          <MDEdit
            :disabled="ifEdit"
            v-model:md="model.content"
            v-model:md_theme="model.theme.md"
            v-model:code_theme="model.theme.code"
          />
        </el-form-item>
        <el-form-item label="补充内容" prop="supplement" v-if="ifEdit">
          <MDEdit
            v-model:md="model.supplement.content"
            v-model:md_theme="model.supplement.theme.md"
            v-model:code_theme="model.supplement.theme.code"
          />
        </el-form-item>
        <el-form-item label="是否公开">
          <el-switch v-model="model.ifPublic" />
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
.addDiary {
  width: 800px;
}
</style>