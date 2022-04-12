<script lang="ts">
import { ref, reactive } from "vue";
import { ElForm } from "element-plus";
import { FormItemRule } from "element-plus/es/components/form/src/form.type";
import { ComVerify } from "com_utils/ComVerify";
import { AdminApiCon } from "@/http/apiCon/main/AdminApiCon";
import { UserDataProxy } from "@/localData/dataItem/UserDataProxy";
import { Mes } from "@/mes/Mes";
export default {
  components: {},
  props: {},
  setup(props, ctx) {
    const loading = ref(false);
    const formRef = ref<InstanceType<typeof ElForm>>();
    const formRules: Record<"password", FormItemRule> = {
      password: {
        required: true,
        validator: (rule, value, callback) => {
          callback(ComVerify.UserV.password(value) || undefined);
        },
      },
    };
    const model = reactive<
      Pick<EN.IUserE, "password"> & {
        password_: string;
      }
    >({
      password_: "",
      password: "",
    });

    /** 保存 */
    function save() {
      if (loading.value) {
        return;
      }
      formRef.value
        ?.validate()
        ?.then(() => {
          //发出请求
          loading.value = true;
          AdminApiCon.instance
            .editUserPassword({
              p: model.password_,
              newP: model.password,
            })
            .then((token) => {
              model.password_ = "";
              model.password = "";
              //重新设置token
              UserDataProxy.instance.data.token = token;
              //
              Mes.success("修改成功，已重新设置本地token");
            })
            .catch(Mes.handleHttpCatch)
            .finally(() => {
              loading.value = false;
            });
        })
        .catch((e) => {
          console.warn(e);
        });
    }

    return {
      loading,
      model,
      formRef,
      formRules,
      save,
    };
  },
};
</script>

<template>
  <div class="password">
    <el-form :model="model" ref="formRef" :rules="formRules" label-width="80px">
      <el-form-item label="原密码" prop="password">
        <el-input
          type="password"
          v-model="model.password_"
          placeholder="请输入原密码"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input
          type="password"
          v-model="model.password"
          placeholder="请输入新密码"
        />
      </el-form-item>
    </el-form>
    <my-button :loading="loading" class="con" type="e" @click="save"
      >提交</my-button
    >
  </div>
</template>

<style scoped lang="scss">
.password {
  > .con {
    margin-left: 80px;
  }
}
</style>
