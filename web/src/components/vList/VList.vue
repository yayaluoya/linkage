<script lang="ts">
import {
  ref,
  reactive,
  VNode,
  onMounted,
  watch,
  toRef,
  toRefs,
  nextTick,
} from "vue";
import State from "../State/State.vue";
export default {
  components: { State },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    getExtraHeight: {
      type: Function,
      default: () => {
        return 0;
      },
    },
    state: Object,
  },
  emits: ["touchBottom"],
  setup(props, ctx) {
    let itemHeight = ref(0);
    const rootRef = ref<HTMLDivElement>();
    const listRef = ref<HTMLDivElement>();
    const bottomRef = ref<HTMLDivElement>();
    /** 获取额外高度 */
    const getExtraHeight: (item: any) => number = props.getExtraHeight as any;

    /** 当前显示的列表索引，默认只显示第一个索引 */
    const onShowListIndex = ref<number[]>([]);
    /** 填充内容高度 */
    const fillUpContent = reactive({
      height: 0,
      top: 0,
    });

    /** 计算当前显示的元素列表 */
    function computeShowItem() {
      if (itemHeight.value <= 0) {
        return;
      }
      let showHeight = rootRef.value!.offsetHeight;
      let scrollTop = rootRef.value!.scrollTop;
      //根据当前滚动的位置计算应该显示哪些元素
      let _startI = 0;
      let _endI = 0;
      try {
        let s = false;
        let e = false;
        let bottomHeight = bottomRef.value!.getBoundingClientRect().height;
        props.list.reduce((a: number, b, index) => {
          let _ = a + getExtraHeight(b) + itemHeight.value;
          if (!s && _ > scrollTop) {
            _startI = index;
            s = true;
          }
          if (!e && _ >= showHeight + scrollTop - bottomHeight) {
            _endI = index;
            e = true;
          }
          if (s && e) {
            throw "";
          }
          return _;
        }, 0);
      } catch {}
      // console.log(_startI, _endI);
      //根据开始和结束的索引获取中间的索引列表
      onShowListIndex.value.length = 0;
      for (let i = _startI; i <= _endI; i++) {
        onShowListIndex.value.push(i);
      }
      computeFillUp();
    }
    /** 计算填充内容高度 */
    function computeFillUp() {
      let topH = onShowListIndex.value[0] || 0;
      let _topH = 0;
      try {
        props.list.forEach((item, index) => {
          if ((onShowListIndex.value[0] || 0) == index) {
            throw "";
          }
          _topH += getExtraHeight(item);
        });
      } catch {}
      fillUpContent.top = topH * itemHeight.value + _topH;
      fillUpContent.height =
        props.list.length * itemHeight.value +
        props.list.reduce((a: number, b) => {
          return a + getExtraHeight(b);
        }, 0);
    }

    /** 监听子元素高度和列表长度的改变 */
    watch([itemHeight, toRef(props.list, "length")], () => {
      computeShowItem();
    });

    onMounted(() => {
      //监听list根节点的滚动事件
      rootRef.value!.addEventListener("scroll", () => {
        computeShowItem();
      });
      computeShowItem();
      getItemHeight();
    });

    /** 获取一个item元素的高度 */
    function getItemHeight() {
      if (props.list.length > 0) {
        onShowListIndex.value = [0];
        nextTick(() => {
          //获取一个子元素的高度
          itemHeight.value =
            listRef.value!.getBoundingClientRect().height -
            getExtraHeight(props.list[0]);
        });
      }
    }

    //
    return {
      rootRef,
      listRef,
      bottomRef,
      fillUpContent,
      onShowListIndex,
    };
  },
};
</script>

<template>
  <div class="v_list_root" ref="rootRef">
    <div
      class="content"
      :style="{
        height: `${fillUpContent.height}px`,
      }"
    >
      <div
        class="list"
        ref="listRef"
        :style="{
          transform: `translateY(${fillUpContent.top}px)`,
        }"
      >
        <template v-for="(item, index) in onShowListIndex" :key="index">
          <slot :item="list[item]" :index="item" />
        </template>
      </div>
    </div>
    <div class="bottom" ref="bottomRef"><State :state="state" /></div>
  </div>
</template>

<style scoped lang="scss">
.v_list_root {
  overflow: auto;
  > .content {
    width: 100%;
    overflow: hidden;
    > .list {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  > .bottom {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
