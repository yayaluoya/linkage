<script lang="ts">
import { ref, reactive } from "vue";
export default {
  components: {},
  props: {
    state: {
      type: Object,
      default: {
        r: 8,
        c: 10,
      },
    },
    data: {
      type: Object,
      default: {},
    },
    format: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:data", "update:format"],
  setup(_, ctx) {
    function formatChange(value: boolean) {
      ctx.emit("update:format", value);
    }
    return {
      formatChange,
    };
  },
};
</script>

<template>
  <div class="selectDialog_">
    <span>{{ state.r }}行{{ state.c }}列</span>
    <div
      class="list"
      :style="{
        'grid-template-columns': `repeat(${state.c},auto)`,
        'grid-template-rows': `repeat(${state.r},auto)`,
      }"
    >
      <div
        class="item"
        :class="{
          head: Math.ceil((index + 1) / state.c) == 1,
        }"
        v-for="(item, index) in Array.from({
          length: state.r * state.c,
        })"
        :key="index"
      >
        <input type="text" v-model="data[index + 1]" />
      </div>
    </div>
    <div class="checkbox">
      <el-checkbox
        :checked="format"
        @change="formatChange"
        label="是否格式化表格"
      ></el-checkbox>
    </div>
  </div>
</template>

<style scoped lang="scss">
.selectDialog_ {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > span {
    width: 100%;
    text-align: left;
    margin-bottom: 10px;
    font-weight: bold;
    color: #40485b;
    color: #7e7e7e;
    font-size: 14px;
  }
  > .list {
    display: grid;
    color: #40485b;
    > .item {
      width: 100px;
      height: 30px;
      > input {
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        border: none;
        outline: none;
        background-color: transparent;
        box-shadow: 1px 0 0 0 #ccc inset, 1px 0 0 0 #ccc, 0 1px 0 0 #ccc inset,
          0 1px 0 0 #ccc;
        padding: 5px;
        &:focus {
          border-left: 2px solid #40485b;
          padding-left: 3px;
        }
      }
      &.head {
        > input {
          font-weight: bold;
        }
      }
    }
  }
  > .checkbox {
    width: 100%;
    text-align: left;
  }
}
</style>
