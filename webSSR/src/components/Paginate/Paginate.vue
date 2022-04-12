<script lang="ts">
import { ref, reactive, toRef, computed, watch } from "vue";
interface IProps {
  [key: string]: any;
  paginate?: {
    /** 当前页数 */
    page: number;
    /** 每页大小 */
    size: number;
    /** 总长度 */
    length: number;
  };
  /** 类型，普通和递增 */
  type: "com" | "is";
}
export default {
  components: {},
  props: {
    paginate: Object,
    type: {
      type: String,
      default: "com",
    },
  },
  emits: ["change"],
  setup(props, ctx) {
    const page_ = ref();
    watch(toRef(props.paginate!, "page"), () => {
      page_.value = props.paginate!.page;
    });

    /** 是否最后一页 */
    const ifLastPage = computed(() => {
      return (
        props.paginate!.page * props.paginate!.size >= props.paginate!.length
      );
    });

    /** 页码改变 */
    function changePage(n: number) {
      n = parseInt(n + "") || 1;
      n = Math.max(1, n);
      if (props.paginate!.page == n) {
        return;
      }
      ctx.emit("change", n);
    }
    return {
      page_,
      changePage,
      ifLastPage,
    };
  },
};
</script>

<template>
  <div class="paginate" v-if="paginate.length > 0">
    <template v-if="type == 'is'">
      <span
        class="more"
        :class="{
          no: ifLastPage,
          'border-box': !ifLastPage,
        }"
        @click="
          () => {
            !ifLastPage && changePage(paginate.page + 1);
          }
        "
        >{{ ifLastPage ? "已经到底了😛" : "更多" }}</span
      >
    </template>
    <template v-if="type == 'com'">
      <span v-if="paginate.length">共有{{ paginate.length }}条数据</span>
      <my-button
        @click="changePage(paginate.page - 1)"
        :disabled="paginate.page <= 1"
        >上一页</my-button
      >
      <span>{{ paginate.page }}</span>
      <my-button @click="changePage(paginate.page + 1)" :disabled="ifLastPage"
        >下一页</my-button
      >
      <span>前往</span>
      <el-input
        class="input"
        size="small"
        v-model="page_"
        @change="changePage(page_)"
      ></el-input>
      <span>页</span>
    </template>
  </div>
</template>

<style scoped lang="scss">
.paginate {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
  border-top: 1px dashed var(--border-color);
  padding-top: 10px;
  > .more {
    width: calc(100% - 12px);
    color: var(--color);
    font-size: 16px;
    text-align: center;
    border-radius: var(--border-radius);
    padding: 5px;
    margin: 0;
    &:not(.no) {
      cursor: pointer;
      font-weight: bold;
      background-color: white;
    }
    &.no {
      opacity: 0.6;
    }
  }
  > span {
    margin: 0 10px;
    color: #b3b3c5;
    font-weight: bold;
  }
  > .input {
    width: 50px;
  }
}
</style>
