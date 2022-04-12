<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { EPage } from "@/router/EPage";
import { headImg } from "@/const/headImg";
import { ElForm } from "element-plus";
import { FormItemRule } from "element-plus/es/components/form/src/form.type";
import { ComApiCon } from "@/http/apiCon/main/ComApiCon";
import { Mes } from "@/mes/Mes";
import { UserDataProxy } from "@/localData/dataItem/UserDataProxy";
import { ComVerify } from "com_utils/ComVerify";
import { Base64 } from "com_utils/Base64";
import { FSTool } from "@/firstScreen/FSTool";
import { SSROpT } from "@/erect/SSROpT";
export default {
  ...SSROpT.inject({
    asyncHeadLabel() {
      return {
        title: "登录",
      };
    },
  }),
  components: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const ifLoading = ref(false);
    const model = reactive<Partial<EN.IUserE>>({
      account: "",
      password: "",
    });
    const formRef = ref<InstanceType<typeof ElForm>>();
    const formRules: Record<
      Extract<"account" | "password", keyof EN.IUserE>,
      FormItemRule
    > = {
      account: {
        required: true,
        validator(_, value, callback) {
          callback(ComVerify.UserV.account(value) || undefined);
        },
      },
      password: {
        required: true,
        validator(_, value, callback) {
          callback(ComVerify.UserV.password(value) || undefined);
        },
      },
    };

    /** 登录 */
    function login() {
      if (ifLoading.value) {
        return;
      }
      formRef.value
        ?.validate()
        ?.then(() => {
          ifLoading.value = true;
          ComApiCon.instance
            .login({
              account: model.account,
              password: model.password,
            })
            .then((data) => {
              Mes.success("登录成功");
              //   console.log("登录成功", data);
              UserDataProxy.instance.setUserData(data);
              //获取上一个页面的路径
              let _back = route.query.back as string;
              if (_back) {
                _back = Base64.decode(_back);
              }
              router.push({
                path: _back || EPage.Home,
              });
            })
            .catch(Mes.handleHttpCatch)
            .finally(() => {
              ifLoading.value = false;
            });
        })
        .catch((e) => {
          console.warn(e);
        });
    }

    /** 去主页 */
    function toHome() {
      router.push({
        path: EPage.Home,
      });
    }

    onMounted(() => {
      FSTool.instance.hide();
    });

    return {
      headImg,
      toHome,
      model,
      formRef,
      formRules,
      login,
      ifLoading,
    };
  },
};
</script>

<template>
  <div class="login">
    <div class="content">
      <el-image
        class="img"
        :src="headImg"
        fit="cover"
        alt="yayaluoya-headPortrait"
        @click="toHome"
      ></el-image>
      <span @click="toHome">YAYALUOYA</span>
      <el-form :model="model" ref="formRef" :rules="formRules">
        <el-form-item label="账号" prop="account">
          <el-input v-model="model.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="model.password"
            placeholder="请输入密码"
          />
        </el-form-item>
      </el-form>
      <my-button type="e" @click="login">登录</my-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  > .content {
    width: 300px;
    background-color: white;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
    border-radius: var(--border-radius);
    > .el-image {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      position: absolute;
      top: -40px;
      border: 2px solid white;
      cursor: pointer;
    }
    > span {
      cursor: pointer;
      font-weight: bold;
      font-size: 20px;
      color: var(--color);
      margin-bottom: 20px;
    }
    > .el-form {
      width: 100%;
      margin-bottom: 20px;
    }
    > button {
      width: 100%;
      padding: 8px;
    }
  }
}
</style>
