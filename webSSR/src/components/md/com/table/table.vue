<script lang="ts">
import { ref, reactive, computed, watch } from "vue";
import Dialog from ">/Dialog/Dialog.vue";
import selectDialog from "./selectDialog.vue";
export default {
  components: { Dialog, selectDialog },
  emits: ["openSelect", "selectBack"],
  setup(_, ctx) {
    const row = ref(10);
    const column = ref(8);
    const onIndex = ref(0);
    const state = computed(() => {
      return getState(onIndex.value);
    });
    const showSelect = ref(false);
    /** 选择的数据 */
    const selectData = ref<Record<number, string>>({});
    /** 是否格式化 */
    const format = ref(false);
    /** 选择 */
    function select() {
      //打开选择框
      showSelect.value = true;
      //
      let data: any = {};
      for (let i = 1; i <= state.value.row * state.value.column; i++) {
        data[i] = "";
      }
      ctx.emit("openSelect");
      selectData.value = data;
    }
    /** 按钮操作 */
    function bottonCon(type: "off" | "yes") {
      //
      switch (type) {
        case "off":
          break;
        case "yes":
          // console.log("选择的数据", selectData.value);
          break;
      }
      let array: string[] = [];
      for (let i in selectData.value) {
        array[parseInt(i) - 1] = selectData.value[i];
      }
      let maxLenght = 0;
      if (format.value) {
        maxLenght = array.reduce((a, b) => {
          return Math.max(a, b.length);
        }, 0);
        array = array.map((item) => {
          return item.padEnd(maxLenght, " ");
        });
      }
      //截断数组
      let array_: string[][] = [];
      for (let i = 0; i < state.value.row; i++) {
        array_.push(array.splice(0, state.value.column));
      }
      let _str = "";
      _str += `|${array_[0].join("|")}|\n`;
      if (array_.length > 1) {
        _str += `|${Array.from({
          length: state.value.column,
        })
          .map(() => {
            return format.value ? "".padEnd(maxLenght, "-") : "-";
          })
          .join("|")}|\n`;
        for (let i = 1; i < array_.length; i++) {
          _str += `|${array_[i].join("|")}|\n`;
        }
      }
      ctx.emit("selectBack", _str);
      showSelect.value = false;
      onIndex.value = 0;
      selectData.value = {};
    }

    watch(showSelect, () => {
      if (!showSelect.value) {
        onIndex.value = 0;
      }
    });

    /** 获取状态 */
    function getState(_i: number) {
      return {
        row: Math.ceil(_i / column.value),
        column: _i % column.value || column.value,
      };
    }
    //
    return {
      row,
      column,
      onIndex,
      state,
      select,
      showSelect,
      bottonCon,
      selectData,
      getState,
      format,
    };
  },
};
</script>

<template>
  <div class="table_">
    <div
      class="list"
      :style="{
        'grid-template-columns': `repeat(${column},auto)`,
        'grid-template-rows': `repeat(${row},auto)`,
      }"
      @mouseleave="
        () => {
          !showSelect && (onIndex = 0);
        }
      "
    >
      <div
        class="item"
        :class="{
          on:
            getState(index + 1).row <= state.row &&
            getState(index + 1).column <= state.column,
        }"
        v-for="(item, index) in Array.from({
          length: row * column,
        })"
        :key="index"
        @mouseenter="!showSelect && (onIndex = index + 1)"
        @click="select"
      ></div>
    </div>
    <span>{{
      onIndex == 0 ? "插入表格" : `${state.row}行${state.column}列`
    }}</span>
  </div>
  <Dialog title="插入表格" v-model:show="showSelect">
    <selectDialog
      v-if="showSelect"
      :state="{
        r: state.row,
        c: state.column,
      }"
      v-model:data="selectData"
      v-model:format="format"
    />
    <template #bottom>
      <my-button style="margin-right: 10px" @click="bottonCon('off')"
        >取消</my-button
      >
      <my-button type="e" @click="bottonCon('yes')">确定</my-button>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.table_ {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  > .list {
    display: grid;
    grid-row-gap: 1px;
    grid-column-gap: 1px;
    > .item {
      width: 14px;
      height: 14px;
      cursor: pointer;
      display: inline-block;
      background-color: var(--background-color);
      border: 1px solid var(--border-color);
      transition: all 0.1s;
      &.on {
        background-color: var(--theme-color);
      }
    }
  }
  > span {
    font-size: 20px;
    color: #666;
    margin-top: 10px;
  }
}
</style>
