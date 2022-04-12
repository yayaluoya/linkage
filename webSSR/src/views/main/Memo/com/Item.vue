<script lang="ts">
import { ref, reactive, computed } from "vue";
import MDShow from ">/md/MDShow.vue";
import { byStrGetTheme } from "@/components/md/MDTheme";
import { UserDataProxy } from "@/localData/dataItem/UserDataProxy";
import { Edit } from "@element-plus/icons-vue";
import { Vector2 } from "@/utils/Vector2";
import { AdminApiCon } from "@/http/apiCon/main/AdminApiCon";
import { Mes } from "@/mes/Mes";
import moment from "moment";
export default {
  components: { MDShow, Edit },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    /** 当前缩放 */
    scale: {
      type: Number,
      default: 1,
    },
  },
  emits: ["edit"],
  setup(props, ctx) {
    const ifLogin = computed(() => {
      return UserDataProxy.instance.ifLogin;
    });
    const loading = ref(false);
    const myRef = ref<HTMLDivElement>();
    /** 主题 */
    const theme = computed(() => {
      return byStrGetTheme(props.data.theme);
    });
    /** 偏移位置 */
    const diffPos = reactive({
      x: 0,
      y: 0,
    });
    /** 位置，等于偏移位置加实际位置 */
    const pos = computed(() => {
      return {
        x: diffPos.x + parseInt(props.data.x),
        y: diffPos.y + parseInt(props.data.y),
      };
    });

    /** 编辑点击 */
    function edit() {
      ctx.emit("edit");
    }

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
      let eRect = myRef.value?.getBoundingClientRect()!;
      Vector2.subtract(ePos, new Vector2(eRect.x, eRect.y), absEPos);
      //相对位置一定要反缩放一下
      absEPos.x /= props.scale;
      absEPos.y /= props.scale;
      //记录鼠标移动样式
      window.addEventListener("mousemove", mouseMove);
      let mouseupF = () => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseupF);
        /** 必须超过一定的拖动距离才生效 */
        if (new Vector2(diffPos.x, diffPos.y).length <= 5) {
          diffPos.x = 0;
          diffPos.y = 0;
          return;
        }
        //保存数据
        loading.value = true;
        let op = {
          id: props.data.id,
          x: parseInt(props.data.x) + diffPos.x,
          y: parseInt(props.data.y) + diffPos.y,
        };
        AdminApiCon.instance
          .editMemoPos(op)
          .then(() => {
            Mes.success("移动成功");
            props.data.x = op.x + "";
            props.data.y = op.y + "";
          })
          .catch(Mes.handleHttpCatch)
          .finally(() => {
            loading.value = false;
            //置空位置偏移量
            diffPos.x = 0;
            diffPos.y = 0;
          });
      };
      window.addEventListener("mouseup", mouseupF);
    }
    /** 鼠标移动 */
    function mouseMove(e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();
      let ePos = new Vector2(e.x, e.y);
      let parentERect = myRef.value?.parentElement?.getBoundingClientRect()!;
      let absPEPos = Vector2.subtract(
        ePos,
        new Vector2(parentERect.x, parentERect.y)
      );
      //相对位置一定要反缩放一下
      absPEPos.x /= props.scale;
      absPEPos.y /= props.scale;
      //
      let newPos = Vector2.subtract(absPEPos, absEPos);
      diffPos.x = newPos.x - parseInt(props.data.x);
      diffPos.y = newPos.y - parseInt(props.data.y);
    }

    /**  获取时间 */
    function getTime(n: string) {
      return moment(parseInt(n + "")).format("YYYY年M月D日");
    }

    return {
      ifLogin,
      loading,
      theme,
      edit,
      mousedown,
      myRef,
      diffPos,
      pos,
      getTime,
    };
  },
};
</script>

<template>
  <div
    class="memoItem"
    :style="{
      top: pos.y + 'px',
      left: pos.x + 'px',
    }"
    ref="myRef"
    v-loading="loading"
    @mousedown="
      (e) => {
        e.stopPropagation();
      }
    "
  >
    <el-icon v-if="ifLogin" @click="edit"><Edit /></el-icon>
    <span
      class="title"
      @mousedown="
        (e) => {
          ifLogin && mousedown(e);
        }
      "
    >
      {{ data.title }}
    </span>
    <MDShow
      class="md"
      :content="data.content"
      :md_theme="theme.md"
      :code_theme="theme.code"
    />
    <span class="time">{{ getTime(data.createTime) }}</span>
  </div>
</template>

<style scoped lang="scss">
.memoItem {
  display: flex;
  flex-direction: column;
  width: 200px;
  border-radius: var(--border-radius);
  padding: 10px;
  border: 1px solid var(--border-color);
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  // backdrop-filter: blur(50px);
  cursor: auto;
  > .el-icon {
    position: absolute;
    font-size: 20px;
    top: 5px;
    right: 5px;
    cursor: pointer;
    color: #cfcfcf;
  }
  > .title {
    font-size: 20px;
    line-height: 20px;
    font-weight: bold;
    color: var(--color);
    margin-bottom: 10px;
    cursor: move;
  }
  > .md {
    width: calc(100% - 10px);
    max-height: 160px;
    overflow: auto;
    background-color: #fbfbfb;
    border-radius: var(--border-radius);
    padding: 5px;
  }
  > .time {
    width: 100%;
    text-align: right;
    font-size: 12px;
    color: var(--color);
    margin-top: 10px;
  }
}
</style>
