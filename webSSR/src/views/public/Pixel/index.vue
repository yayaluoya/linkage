<script lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { Edit, ArrowLeftBold } from "@element-plus/icons-vue";
import { EPage } from "@/router/EPage";
import { PageTool } from "@/router/PageTool";
import { IPixelData, OtherApiCon } from "@/http/apiCon/main/OtherApiCon";
import { Mes } from "@/mes/Mes";
import { FormItemRule } from "element-plus/es/components/form/src/form.type";
import { ElForm } from "element-plus";
import { JSONPar } from "@/utils/JSONPar";
import ImgSelect_ from ">/imgSelect/imgSelect.vue";
import MDEdit from ">/md/MDEdit.vue";
import { UserDataProxy } from "@/localData/dataItem/UserDataProxy";
import MDShow from ">/md/MDShow.vue";
import { PixelDP } from "@/localData/dataItem/PixelDP";
import { getAverageRGB } from "./getAverageRGB";

export default {
  components: { ArrowLeftBold, ImgSelect_, MDEdit, MDShow },
  props: {},
  setup(props, ctx) {
    const ifLogin = computed(() => {
      return UserDataProxy.instance.ifLogin;
    });
    const loading = ref(false);
    const addLoading = ref(false);
    const editLoading = ref(false);
    const listRef = ref<HTMLDivElement>();
    const formRef = ref<InstanceType<typeof ElForm>>();
    const info = ref<IPixelData["info"]>({
      v: 0,
      range: {
        /** 起点位置 */
        p1: {
          x: 0,
          y: 0,
        },
        /** 终点位置 */
        p2: {
          x: 0,
          y: 0,
        },
      },
      /** 涉及的图片 */
      img: "",
      /** 提示语 */
      alert: "",
      /** 主题 */
      theme: "",
    });
    const onSelectIndex = ref(-1);
    const list = ref<IPixelData["list"]>([]);
    const formRules: Record<"a", FormItemRule> = {
      a: {},
    };
    /** 已经完成的image */
    let comImg: HTMLImageElement;
    const offLoading = ref<number[]>([]);
    /** 显示数字 */
    const showNumber = ref(false);

    /** 参与的items */
    const piList = computed(() => {
      return PixelDP.instance
        .getPis(info.value.v)
        .map((id) => {
          return list.value.find((_) => _.id == id);
        })
        .filter(Boolean);
    });

    /** 当前选择的位置 */
    const onSelectPos = computed(() => {
      if (onSelectIndex.value == -1) {
        return;
      } else {
        return list.value[onSelectIndex.value];
      }
    });

    /** canvas的上下文 */
    let canvasCtx: CanvasRenderingContext2D;
    /** 获取某个元素的颜色 */
    function getItemColor(index: number) {
      let itemNumber = {
        x: info.value.range.p2.x - info.value.range.p1.x + 1,
        y: info.value.range.p2.y - info.value.range.p1.y + 1,
      };
      let listSize = {
        x: 0,
        y: 0,
      };
      let itemSize = {
        x: 0,
        y: 0,
      };
      //根据当前数据设置list的宽高
      let rect = listRef.value?.getBoundingClientRect()!;
      listSize.x = rect.width;
      listSize.y = (itemNumber.y / itemNumber.x) * listSize.x;
      itemSize.y = itemSize.x = listSize.x / itemNumber.x;
      //
      if (!canvasCtx) {
        let canvas = document.createElement("canvas");
        canvas.width = listSize.x;
        canvas.height = listSize.y;
        canvasCtx = canvas.getContext("2d")!;
        canvasCtx.drawImage(comImg, 0, 0, listSize.x, listSize.y);
      }
      //位置
      let pos = {
        x: (index % itemNumber.x) + 1,
        y: Math.floor(index / itemNumber.x) + 1,
      };
      let pixelData = canvasCtx.getImageData(
        (pos.x - 1) * itemSize.x,
        (pos.y - 1) * itemSize.y,
        itemSize.x,
        itemSize.y
      ).data;

      //
      return getAverageRGB(pixelData);
    }

    /** 是否参与 */
    function ifPi(id: number) {
      return piList.value.some((_) => _.id == id);
    }

    /** 编辑数据 */
    function editData() {
      formRef.value
        ?.validate()
        ?.then(() => {
          if (editLoading.value) {
            return;
          }
          editLoading.value = true;
          //
          let _info = {
            ...info.value,
            //这里一定要累加版本
            v: info.value.v + 1,
          };
          //主题必须转成字符串
          _info.theme = JSON.stringify(_info.theme);
          //
          OtherApiCon.instance
            .pixelEditData(_info)
            .then(() => {
              Mes.success("编辑成功");
              //重新获取数据
              getData();
            })
            .catch(Mes.handleHttpCatch)
            .finally(() => {
              editLoading.value = false;
            });
        })
        .catch((e) => {
          console.warn(e);
        });
    }

    /** 获取数据 */
    function getData() {
      loading.value = true;
      OtherApiCon.instance
        .pixelGetData()
        .then((data) => {
          //主题数据需要额外的解析
          data.info.theme = JSONPar(data.info.theme, {
            md: "",
            code: "",
          });
          //
          info.value = data.info;
          return new Promise((r, e) => {
            let f = () => {
              list.value = data.list;
              //根据当前数据设置list的宽高
              let rect = listRef.value?.getBoundingClientRect()!;
              //计算出当前的范围高宽比
              let hw =
                (info.value.range.p2.y - info.value.range.p1.y + 1) /
                (info.value.range.p2.x - info.value.range.p1.x + 1);
              listRef.value!.style.height = rect.width * hw + "px";
              setTimeout(() => {
                r(undefined);
              }, 0);
            };
            comImg = new Image();
            comImg.crossOrigin = "";
            comImg.src = info.value.img;
            if (comImg.complete) {
              f();
            } else {
              comImg.addEventListener("load", () => {
                f();
              });
              comImg.addEventListener("error", () => {
                e({ mes: "图片加载错误" });
              });
            }
          });
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loading.value = false;
        });
    }

    /** 参加防御 */
    function add() {
      addLoading.value = true;
      OtherApiCon.instance
        .pixelAddNumber(list.value[onSelectIndex.value].id, 1)
        .then(() => {
          list.value[onSelectIndex.value].number!++;
          PixelDP.instance.add(
            info.value.v,
            list.value[onSelectIndex.value].id
          );
          Mes.success("你已参与维护");
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          addLoading.value = false;
        });
    }

    /** 取消防御 */
    function off(id: number) {
      if (offLoading.value.includes(id)) {
        return;
      }
      offLoading.value.push(id);
      OtherApiCon.instance
        .pixelAddNumber(id, -1)
        .then(() => {
          let item = list.value.find((_) => _.id == id);
          if (item) {
            item.number = Math.max(0, item.number! - 1);
          }
          PixelDP.instance.off(info.value.v, id);
          Mes.success("取消成功");
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          offLoading.value = offLoading.value.filter((_) => _ != id);
        });
    }

    /** 选择某一项 */
    function selectItem(index: number, item: EN.IPixels) {
      onSelectIndex.value = index;
    }

    /** 返回上一页 */
    function back() {
      PageTool.pageBack(EPage.Blog);
    }

    onMounted(() => {
      getData();
    });

    return {
      back,
      ifLogin,
      listRef,
      formRef,
      editLoading,
      addLoading,
      offLoading,
      loading,
      info,
      list,
      formRules,
      editData,
      selectItem,
      onSelectIndex,
      onSelectPos,
      getItemColor,
      add,
      piList,
      off,
      ifPi,
      showNumber,
    };
  },
};
</script>

<template>
  <div class="pixel border-box" v-loading="loading">
    <div class="back" @click="back">
      <div class="content">
        <el-icon><ArrowLeftBold /></el-icon>
        <span>返回</span>
      </div>
    </div>
    <div class="content">
      <el-form
        v-if="ifLogin"
        :model="info"
        ref="formRef"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="提示信息">
          <MDEdit
            v-model:md="info.alert"
            v-model:md_theme="info.theme.md"
            v-model:code_theme="info.theme.code"
          />
        </el-form-item>
        <el-form-item label="选择图片">
          <ImgSelect_ v-model:img="info.img" />
        </el-form-item>
        <el-form-item label="起点位置">
          <span style="margin-right: 10px">x:</span
          ><el-input-number v-model="info.range.p1.x" />
          <span style="margin-right: 10px; margin-left: 10px">y:</span
          ><el-input-number v-model="info.range.p1.y" />
        </el-form-item>
        <el-form-item label="终点位置">
          <span style="margin-right: 10px">x:</span
          ><el-input-number v-model="info.range.p2.x" />
          <span style="margin-right: 10px; margin-left: 10px">y:</span
          ><el-input-number v-model="info.range.p2.y" />
        </el-form-item>
        <el-form-item label="">
          <my-button type="e" @click="editData()" :loading="editLoading"
            >保存</my-button
          >
        </el-form-item>
      </el-form>
      <div class="info" v-else>
        <MDShow
          class="md"
          :content="info.alert"
          :md_theme="info.theme.md"
          :code_theme="info.theme.code"
        />
        <div class="pos">
          <span>起点位置：[{{ info.range.p1.x }},{{ info.range.p1.y }}]</span>
          <span>终点位置：[{{ info.range.p2.x }},{{ info.range.p2.y }}]</span>
        </div>
      </div>
      <div class="con">
        <span>显示各个点参与维护人数量</span>
        <el-switch v-model="showNumber" />
      </div>
      <div
        class="grid"
        ref="listRef"
        :style="{
          'grid-template-rows': `repeat(${
            info.range.p2.y - info.range.p1.y + 1
          },auto)`,
          'grid-template-columns': `repeat(${
            info.range.p2.x - info.range.p1.x + 1
          },auto)`,
        }"
      >
        <div
          :style="{
            'background-color': getItemColor(index),
          }"
          @click="selectItem(index)"
          class="item"
          :class="{
            on: onSelectPos && item.id == onSelectPos.id,
          }"
          v-for="(item, index) in list"
          :key="index"
        >
          {{ showNumber ? item.number : "" }}
        </div>
      </div>
      <div class="onSelect" v-if="onSelectPos">
        <span
          >当前选择位置({{ onSelectPos.x }},{{ onSelectPos.y }}),共有{{
            onSelectPos.number
          }}人参加维护</span
        >
        <my-button
          v-if="!ifPi(onSelectPos.id)"
          @click="add"
          type="e"
          :loading="addLoading"
          >参加维护</my-button
        >
        <my-button v-else disabled>已参加维护</my-button>
      </div>
      <div class="my" v-if="piList.length > 0">
        <span>我维护的点：</span>
        <div class="item" v-for="(item, index) in piList" :key="index">
          位置({{ item.x }},{{ item.y }}),共有{{ item.number }}人参加维护
          <my-button
            @click="off(item.id)"
            :loading="offLoading.includes(item.id)"
            >取消</my-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pixel {
  width: calc(100% - 2px);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  align-items: flex-start;
  background-color: white;
  > .back {
    width: calc(100% - 20px);
    padding: 10px;
    border-bottom: 1px dashed var(--border-color);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    > .content {
      cursor: pointer;
      text-align: left;
      color: var(--color);
      font-weight: bold;
      font-size: 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  > .content {
    padding: 10px;
    width: calc(100% - 20px);
    display: flex;
    flex-direction: column;
    > .info {
      display: flex;
      flex-direction: column;
      > .pos {
        display: flex;
        flex-direction: column;
        color: var(--color);
        font-size: 16px;
        font-weight: bold;
        margin-top: 20px;
      }
    }
    > .con {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      > span {
        margin-right: 10px;
      }
    }
    > .grid {
      margin-top: 20px;
      width: 100%;
      display: grid;
      > .item {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        transition: all 0.2s;
        font-weight: bold;
        &.on {
          box-shadow: 0 0 0 2px rgb(255 255 255) inset;
        }
      }
    }
    > .onSelect {
      margin-top: 20px;
      font-size: 24px;
      font-weight: bold;
      color: var(--color);
      display: flex;
      flex-direction: row;
      align-items: center;
      > button {
        margin-left: 20px;
      }
    }
    > .my {
      margin-top: 20px;
      font-size: 24px;
      font-weight: bold;
      color: var(--color);
      display: flex;
      flex-direction: column;
      > span {
        margin-bottom: 10px;
      }
      > .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        > button {
          margin-left: 20px;
        }
      }
      > .item:nth-last-child(1) {
        margin-bottom: 0px;
      }
    }
  }
}
</style>