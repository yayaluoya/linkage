<script lang="ts">
import { ref, reactive, computed } from "vue";
import tabs_ from ">/tabs/tabs.vue";
import { themeType, themeList } from "../../MDTheme";
import { Star } from "@element-plus/icons-vue";

const tabList: {
  type: themeType;
  title: string;
  list: typeof themeList["md"];
}[] = [
  {
    type: "md",
    title: "md主题",
    list: [...themeList.md],
  },
  {
    type: "code",
    title: "代码主题",
    list: [...themeList.code],
  },
];

export default {
  components: { tabs_, Star },
  props: {
    md_theme: {
      type: String,
      default: "",
    },
    code_theme: {
      type: String,
      default: "",
    },
  },
  emits: ["selectBack"],
  setup(props, ctx) {
    const tabIndex = ref(0);
    /** 显示数据的列表 */
    const showList = computed(() => {
      return tabList[tabIndex.value].list;
    });

    /** 按钮是否被选择 */
    function buttonOn(item: typeof tabList[0]["list"][0]) {
      switch (tabList[tabIndex.value].type) {
        case "md":
          return item.value == props.md_theme;
        case "code":
          return item.value == props.code_theme;
      }
    }

    /** 按钮点击 */
    function buttonClick(item: typeof tabList[0]["list"][0]) {
      //如果主题没变化的话就不导入了
      if (buttonOn(item)) {
        return;
      }
      ctx.emit("selectBack", tabList[tabIndex.value].type, item.value);
    }

    return {
      tabList,
      tabIndex,
      showList,
      buttonOn,
      buttonClick,
    };
  },
};
</script>

<template>
  <div class="theme_">
    <tabs_ class="tabs" :list="tabList" v-model:index="tabIndex" />
    <div class="list">
      <div class="item" v-for="(item, index) in showList" :key="index">
        <my-button
          :disabled="buttonOn(item)"
          :type="buttonOn(item) ? 'e' : ''"
          @click="buttonClick(item)"
        >
          <el-icon v-if="item.star">
            <Star />
          </el-icon>
          {{ item.name }}
        </my-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.theme_ {
  display: flex;
  flex-direction: column;
  align-items: center;
  > .tabs {
    width: 100%;
  }
  > .list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 5px;
    margin-top: 10px;
    max-height: 500px;
    overflow: auto;
    > .item {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      > button:deep() {
        width: 100%;
        height: 100%;
        .el-icon {
          color: #d66a83;
          margin-right: 2px;
        }
      }
    }
  }
}
</style>
