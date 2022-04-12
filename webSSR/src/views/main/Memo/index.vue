<script lang="ts">
import { ref, reactive, computed, onMounted, watch, toRef } from "vue";
import Add from "./com/Add.vue";
import Item from "./com/Item.vue";
import { UserDataProxy } from "@/localData/dataItem/UserDataProxy";
import { ComApiCon } from "@/http/apiCon/main/ComApiCon";
import { Mes } from "@/mes/Mes";
import { Vector2 } from "@/utils/Vector2";
import { themeDataKey } from "./themeDataKey";
import Edit from "./com/Edit.vue";
import Se from ">/Se/Se.vue";
import { SSROpT } from "@/erect/SSROpT";
import { IMainMeta } from "../IMainMeta";

/**
 * 路由配置
 */
export const routeExportRaw: {
  meta: IMainMeta;
} = {
  meta: {
    /** 自定义内容 */
    cuContent: true,
  },
};

export default {
  ...SSROpT.inject({
    asyncHeadLabel() {
      return {
        title: "便签",
      };
    },
  }),
  components: { Add, Item, Edit, Se },
  setup() {
    const ifLogin = computed(() => {
      return UserDataProxy.instance.ifLogin;
    });
    const loading = ref(false);
    const loadingTheme = ref(false);
    const query = reactive({
      str: "",
    });
    const memoDatas = ref<EN.IMemoE[]>([]);
    const conData = reactive<
      ToolN.DataCon<EN.IMemoE> & {
        show: boolean;
      }
    >({
      show: false,
      type: "",
      data: undefined,
    });
    const list_Ref = ref<HTMLDivElement>();
    /** 偏移位置 */
    const diffPos = reactive({
      x: 0,
      y: 0,
      /** 此轴是用来缩放的 */
      z: 1,
    });
    const editMemoData = reactive({
      show: false,
      data: null,
    });
    /** 主题数据 */
    const themeData = reactive<Record<themeDataKey, any>>({
      backgroundImage: "",
      backgroundSe: [],
    });

    /** 查找便签 */
    function findMemo() {
      if (loading.value) {
        return;
      }
      loading.value = true;
      ComApiCon.instance
        .findMemo({
          str: query.str,
        })
        .then((list) => {
          memoDatas.value = list;
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loading.value = false;
        });
    }

    /** 添加便签 */
    function addMemo(item: EN.IMemoE) {
      conData.type = item ? "edit" : "add";
      conData.data = item;
      conData.show = true;
    }

    /** 编辑子项事件 */
    function editItem(conData: ToolN.DataCon<EN.IMemoE>) {
      let onIndex = memoDatas.value.findIndex((item) => {
        return item.id == conData.data?.id;
      });
      if (onIndex == -1) {
        memoDatas.value.unshift(conData.data!);
      } else {
        memoDatas.value.splice(onIndex, 1, conData.data!);
      }
    }

    watch(toRef(conData, "show"), () => {
      if (!conData.show) {
        conData.type = "";
        conData.data = undefined;
      }
    });

    /** 加载主题数据 */
    function loadTheme() {
      loadingTheme.value = true;
      ComApiCon.instance
        .getUserMemo()
        .then((data) => {
          themeData.backgroundImage = data.backgroundImage || "";
          themeData.backgroundSe = data.backgroundSe || [];
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loadingTheme.value = false;
        });
    }

    onMounted(() => {
      loadTheme();
      findMemo();
    });

    /** 编辑memo */
    function editMemo() {
      editMemoData.show = true;
      editMemoData.data = themeData as any;
    }

    /** 编辑memo回调 */
    function memoEditBack(data: Record<themeDataKey, string>) {
      themeData.backgroundImage = data.backgroundImage;
      themeData.backgroundSe = data.backgroundSe;
    }

    /** 是否操作过 */
    const ifCon = computed(() => {
      return diffPos.x != 0 || diffPos.y != 0 || diffPos.z != 1;
    });

    /** 相对位置，在鼠标按下的时候需要记录下 */
    const absEPos = new Vector2();
    /** 鼠标按下 */
    function mousedown(e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();
      if (loading.value) {
        return;
      }
      let ePos = new Vector2(e.x, e.y);
      let eRect = list_Ref.value?.getBoundingClientRect()!;
      Vector2.subtract(new Vector2(eRect.x, eRect.y), ePos, absEPos);
      //记录鼠标移动样式
      window.addEventListener("mousemove", mouseMove);
      let mouseupF = () => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseupF);
      };
      window.addEventListener("mouseup", mouseupF);
    }
    /** 鼠标移动 */
    function mouseMove(e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();
      let ePos = new Vector2(e.x, e.y);
      let parentERect = list_Ref.value?.parentElement?.getBoundingClientRect()!;
      let absPEPos = Vector2.subtract(
        ePos,
        new Vector2(parentERect.x, parentERect.y)
      );
      //
      let newPos = Vector2.add(absPEPos, absEPos);
      diffPos.x = newPos.x;
      diffPos.y = newPos.y;
    }
    /** 缩放改变 */
    function scaleChange(n: number) {
      let parentERect = list_Ref.value?.parentElement?.getBoundingClientRect()!;
      let absPEPos = new Vector2(parentERect.width / 2, parentERect.height / 2);
      let absEPos = Vector2.subtract(
        absPEPos,
        new Vector2(diffPos.x, diffPos.y)
      );
      absEPos.x /= diffPos.z;
      absEPos.x *= n;
      absEPos.y /= diffPos.z;
      absEPos.y *= n;
      let newPos = Vector2.subtract(absPEPos, absEPos);
      diffPos.x = newPos.x;
      diffPos.y = newPos.y;
      diffPos.z = n;
    }

    /** 复原 */
    function recover() {
      diffPos.x = 0;
      diffPos.y = 0;
      diffPos.z = 1;
    }

    return {
      ifLogin,
      themeData,
      loading,
      loadingTheme,
      query,
      conData,
      memoDatas,
      findMemo,
      addMemo,
      editItem,
      diffPos,
      list_Ref,
      mousedown,
      recover,
      scaleChange,
      ifCon,
      editMemo,
      editMemoData,
      memoEditBack,
    };
  },
};
</script>

<template>
  <div class="memo">
    <Edit
      v-model:show="editMemoData.show"
      :data="editMemoData.data"
      @edit="memoEditBack"
    />
    <Add v-model:show="conData.show" :conData="conData" @edit="editItem" />
    <my-button
      v-if="ifCon"
      @click="
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          recover();
        }
      "
      ><span v-if="ifCon"
        >x:{{ parseInt(diffPos.x) }} y:{{ parseInt(diffPos.y) }} z:{{
          diffPos.z.toFixed(2)
        }}</span
      >
      回到原点</my-button
    >
    <div
      class="slider"
      @mousedown="
        (e) => {
          e.preventDefault();
          e.stopPropagation();
        }
      "
    >
      <el-slider
        :step="0.001"
        :min="0.5"
        :max="1.5"
        :model-value="diffPos.z"
        @input="scaleChange"
        vertical
      ></el-slider>
    </div>
    <div class="query">
      <el-input
        clearable
        placeholder="输入要查找的便签"
        v-model="query.str"
        @change="findMemo"
      />
      <my-button @click="findMemo">查找</my-button>
      <my-button type="e" @click="editMemo()" v-if="ifLogin">编辑</my-button>
      <my-button type="e" @click="addMemo()" v-if="ifLogin">添加</my-button>
    </div>
    <div
      class="list"
      v-if="loading || memoDatas.length > 0"
      v-loading="loading"
      @mousedown="
        (e) => {
          mousedown(e);
        }
      "
      :style="{
        'background-image': `url(${themeData.backgroundImage})`,
      }"
    >
      <Se
        v-for="(item, index) in themeData.backgroundSe"
        :key="index"
        :se="item"
      />
      <div
        class="_"
        :style="{
          top: diffPos.y + 'px',
          left: diffPos.x + 'px',
          transform: `scale(${diffPos.z})`,
        }"
        ref="list_Ref"
      >
        <Item
          class="item"
          v-for="(item, index) in memoDatas"
          :scale="diffPos.z"
          :data="item"
          :key="index"
          @edit="addMemo(item)"
        />
      </div>
    </div>
    <my-null v-if="!loading && memoDatas.length <= 0" />
  </div>
</template>

<style scoped lang="scss">
.memo {
  position: relative;
  > * {
    z-index: 2;
  }
  > .query {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 10px;
    left: 10px;
    > .el-input {
    }
    > button {
      margin-left: 20px;
      width: 100px;
      height: 100%;
    }
  }
  > button {
    top: 10px;
    right: 10px;
    position: absolute;
    box-shadow: 0 3px 8px 0 rgb(0 0 0 / 5%);
  }
  > .slider {
    position: absolute;
    height: 300px;
    top: calc(50% - 150px - 5px);
    right: 10px;
    padding: 5px 2px;
    background-color: hsl(0deg 0% 98% / 70%);
    border-radius: 20px;
    box-shadow: 0 3px 8px 0 rgb(0 0 0 / 5%);
    // backdrop-filter: blur(50px);
  }
  > .list {
    width: 100%;
    background-color: white;
    height: 618px;
    overflow: hidden;
    cursor: move;
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 1;
    > ._ {
      width: 0;
      height: 0;
      position: absolute;
    }
  }
}
</style>
