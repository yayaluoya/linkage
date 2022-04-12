<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ElForm } from "element-plus";
import { FormItemRule } from "element-plus/es/components/form/src/form.type";
import { ComVerify } from "com_utils/ComVerify";
import { AdminApiCon } from "@/http/apiCon/main/AdminApiCon";
import { Mes } from "@/mes/Mes";
import { UserEvent } from "@/event/UserEvent";
import ImgSelect_ from ">/imgSelect/imgSelect.vue";
import WHImgSelect from ">/WHImgSelect/WHImgSelect.vue";
import { ComApiCon } from "@/http/apiCon/main/ComApiCon";
import { NormalSeList, SeList } from ">/Se/SeList";
import { JSONPar } from "-/JSONPar";

/** 主题数据key类型 */
type themeDataKeyType =
  | "head_portrait"
  | "background_picture"
  | "background_se"
  | "main_background_se"
  | "main_background_se_opacity";

export default {
  components: { ImgSelect_, WHImgSelect },
  props: {},
  setup(props, ctx) {
    const loading = ref(false);
    const loadLoading = ref(false);
    const ifOpenImgBaseSelect = ref(false);
    const selectImgKey = ref<themeDataKeyType | "">("");
    const formRef = ref<InstanceType<typeof ElForm>>();
    const formRules: Record<
      | Extract<
          "name" | "state" | "introduction" | "socialData",
          keyof EN.IUserDataE
        >
      | Exclude<
          themeDataKeyType,
          "background_se" | "main_background_se" | "main_background_se_opacity"
        >,
      FormItemRule
    > = {
      name: {
        required: true,
        validator: (rule, value, callback) => {
          callback(ComVerify.UserV.name_(value) || undefined);
        },
      },
      state: {
        required: true,
        validator: (rule, value, callback) => {
          callback(ComVerify.UserV.state(value) || undefined);
        },
      },
      introduction: {
        required: true,
        validator: (rule, value, callback) => {
          callback(ComVerify.UserV.introduction(value) || undefined);
        },
      },
      head_portrait: {
        required: true,
        validator: (rule, value, callback) => {
          callback(
            ComVerify.lengthV(
              model.themeData?.head_portrait!,
              [1, 300],
              "头像"
            ) ||
              ComVerify.urlV(model.themeData?.head_portrait!) ||
              undefined
          );
        },
      },
      background_picture: {
        required: true,
        validator: (rule, value, callback) => {
          callback(
            ComVerify.lengthV(
              model.themeData?.background_picture!,
              [1, 300],
              "背景图片"
            ) ||
              ComVerify.urlV(model.themeData?.background_picture!) ||
              undefined
          );
        },
      },
      socialData: {
        required: true,
        validator: (rule, value, callback) => {
          callback(ComVerify.UserV.socialData(value) || undefined);
        },
      },
    };
    const model = reactive<
      Partial<
        Omit<EN.IUserDataE, "themeData" | "socialData"> & {
          themeData: Record<themeDataKeyType, any>;
          socialData: {
            href: string;
            icon: string;
            name: string;
          }[];
        }
      >
    >({
      name: "",
      state: "",
      introduction: "",
      themeData: {
        head_portrait: "",
        background_picture: "",
        background_se: [],
        main_background_se: [],
        main_background_se_opacity: 0,
      },
      socialData: [],
    });

    /** 选择图片库的图片 */
    function selectImg(key: themeDataKeyType) {
      selectImgKey.value = key;
      ifOpenImgBaseSelect.value = true;
    }

    /** 图片库选择回调 */
    function imgBaseSelectBack(image: string) {
      if (selectImgKey.value) {
        (model?.themeData as any)[selectImgKey.value] = image;
      }
    }

    /** 添加社交 */
    function addSocial() {
      model.socialData?.push({
        name: "",
        href: "",
        icon: "",
      });
    }
    /** 删除社交数据 */
    function delectSocial(index: number) {
      model.socialData?.splice(index, 1);
    }

    /** 保存 */
    function save() {
      if (loading.value) {
        return;
      }
      // console.log(model);
      formRef.value
        ?.validate()
        ?.then(() => {
          //发出请求
          loading.value = true;
          AdminApiCon.instance
            .editUser({
              name: model.name,
              state: model.state,
              introduction: model.introduction,
              themeData: JSON.stringify(model.themeData),
              socialData: JSON.stringify(model.socialData),
            })
            .then(() => {
              //抛出事件
              UserEvent.instance.emit("updateInfo");
              Mes.success("编辑成功");
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

    /** 获取数据 */
    function getData() {
      loadLoading.value = true;
      ComApiCon.instance
        .loginUser()
        .then((data) => {
          let userD = data.dataE;
          model.name = userD?.name;
          model.state = userD?.state;
          model.introduction = userD?.introduction;
          model.themeData = JSONPar(userD?.themeData, {
            head_portrait: "",
            background_picture: "",
            background_se: [],
            main_background_se: [],
            main_background_se_opacity: 0,
          });
          model.themeData!.head_portrait = model.themeData?.head_portrait || "";
          model.themeData!.background_picture =
            model.themeData?.background_picture || "";
          model.themeData!.background_se = model.themeData?.background_se || [];
          model.themeData!.main_background_se =
            model.themeData?.main_background_se || [];
          model.themeData!.main_background_se_opacity =
            model.themeData?.main_background_se_opacity || 0;
          model.socialData = JSONPar(userD?.socialData, []);
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loadLoading.value = false;
        });
    }

    onMounted(() => {
      getData();
    });

    return {
      loading,
      loadLoading,
      selectImg,
      ifOpenImgBaseSelect,
      imgBaseSelectBack,
      model,
      formRef,
      formRules,
      save,
      SeList,
      NormalSeList,
      addSocial,
      delectSocial,
    };
  },
};
</script>

<template>
  <div class="user" v-loading="loadLoading">
    <el-form
      :model="model"
      ref="formRef"
      :rules="formRules"
      label-width="100px"
    >
      <el-form-item label="名字" prop="name">
        <el-input v-model="model.name" placeholder="请输入名字" />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-input v-model="model.state" placeholder="请输入状态" />
      </el-form-item>
      <el-form-item label="个人简介" prop="introduction">
        <el-input v-model="model.introduction" placeholder="请输入个人简介" />
      </el-form-item>
      <el-form-item label="社交信息">
        <div class="social">
          <div
            class="list"
            v-for="(item, index) in model.socialData"
            :key="index"
          >
            <div class="item">
              <el-input v-model="item.name" placeholder="请输入社交名称" />
              <el-input v-model="item.href" placeholder="请输入个人主页" />
              <el-input v-model="item.icon" placeholder="请输入社交网站icon" />
              <my-button @click="delectSocial(index)">删除</my-button>
            </div>
          </div>
          <my-button @click="addSocial">添加社交</my-button>
        </div>
      </el-form-item>
      <el-form-item label="头像" prop="head_portrait">
        <div class="imgselect">
          <ImgSelect_ v-model:img="model.themeData.head_portrait" />
          <my-button @click="selectImg('head_portrait')"
            >从图片库选择</my-button
          >
          <el-input type="text" v-model="model.themeData.head_portrait" />
        </div>
      </el-form-item>
      <el-form-item label="背景图片" prop="background_picture">
        <div class="imgselect">
          <ImgSelect_ v-model:img="model.themeData.background_picture" />
          <my-button @click="selectImg('background_picture')"
            >从图片库选择</my-button
          >
          <el-input type="text" v-model="model.themeData.background_picture" />
        </div>
      </el-form-item>
      <el-form-item label="背景特效">
        <el-checkbox-group v-model="model.themeData.background_se">
          <el-checkbox-button
            v-for="item in SeList"
            :key="item.key"
            :label="item.key"
          >
            {{ item.name }}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="全局背景特效">
        <el-checkbox-group v-model="model.themeData.main_background_se">
          <el-checkbox-button
            v-for="item in NormalSeList"
            :key="item.key"
            :label="item.key"
          >
            {{ item.name }}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="全局背景特效透明度">
        <el-slider
          :step="0.1"
          :min="0"
          :max="1"
          v-model="model.themeData.main_background_se_opacity"
        />
      </el-form-item>
    </el-form>
    <my-button :loading="loading" class="con" type="e" @click="save"
      >提交</my-button
    >
    <WHImgSelect
      v-model:show="ifOpenImgBaseSelect"
      @selectBack="imgBaseSelectBack"
    />
  </div>
</template>

<style scoped lang="scss">
.user {
  .imgselect {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    > button {
      margin: 10px 0;
    }
  }
  > .con {
    margin-left: 80px;
  }
  .social {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    > .list {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      > .item {
        margin-bottom: 5px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background-color: #fbfbfb;
        padding: 10px;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        > * {
          margin-bottom: 5px;
        }
        > :nth-last-child(1) {
          margin-bottom: 0;
        }
      }
      > .item:nth-last-child(1) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
