<script lang="ts">
import { ref, reactive, computed } from "vue";
import { Edit } from "@element-plus/icons-vue";
import { UserDataProxy } from "@/localData/dataItem/UserDataProxy";
import MDShow from ">/md/MDShow.vue";
import moment from "moment";
import { byStrGetTheme } from "@/components/md/MDTheme";
export default {
  components: { Edit, MDShow },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["edit"],
  setup(props, ctx) {
    const ifLogin = computed(() => {
      return UserDataProxy.instance.ifLogin;
    });

    /** 主题 */
    const theme = computed(() => {
      return byStrGetTheme(props.data.theme);
    });
    /** 补充列表 */
    const supplement = computed(() => {
      return ((props.data.supplement || []) as EN.IDiarySupplementE[]).map(
        (item) => {
          if (typeof item.theme == "string") {
            item.theme = byStrGetTheme(item.theme) as any;
          }
          return item;
        }
      );
    });

    /** 编辑按钮点击 */
    function edit() {
      ctx.emit("edit");
    }

    /**  获取时间 */
    function getTime(n: string) {
      return moment(parseInt(n + "")).format("YYYY年M月D日");
    }

    return {
      ifLogin,
      edit,
      theme,
      getTime,
      supplement,
    };
  },
};
</script>

<template>
  <div class="diaryItem border-box">
    <el-icon v-if="ifLogin" @click="edit"><Edit /></el-icon>
    <span>
      {{ data.title }}
    </span>
    <MDShow
      class="md"
      :content="data.content"
      :md_theme="theme.md"
      :code_theme="theme.code"
    />
    <div class="supplement">
      <div class="content">
        <div class="line"></div>
        <div class="item" v-for="(item, index) in supplement" :key="index">
          <MDShow
            class="md"
            :content="item.content"
            :md_theme="item.theme.md"
            :code_theme="item.theme.code"
          />
          <span>{{ getTime(item.createTime) }}</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <span :class="data.ifPublic ? 'pu' : 'pr'">{{
        data.ifPublic ? "Public" : "Private"
      }}</span>
      <span>{{ getTime(data.createTime) }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.diaryItem {
  width: calc(100% - 42px);
  padding: 20px;
  border-radius: var(--border-radius);
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  > .el-icon {
    position: absolute;
    font-size: 20px;
    top: 5px;
    right: 5px;
    cursor: pointer;
    color: #cfcfcf;
  }
  > span {
    font-size: 20px;
    font-weight: bold;
    color: var(--color);
    margin-bottom: 10px;
  }
  > .md {
    overflow: auto;
    max-height: 500px;
  }
  > .supplement {
    width: 100%;
    max-height: 400px;
    overflow: auto;
    > .content {
      width: calc(100% - 20px);
      padding-left: 20px;
      margin-top: 10px;
      position: relative;
      > .line {
        position: absolute;
        top: 0;
        left: 9px;
        width: 2px;
        height: 100%;
        background-color: #f2f1f6;
        border-radius: 2px;
      }
      > .item {
        margin-bottom: 5px !important;
        position: relative;
        display: flex;
        flex-direction: column;
        background-color: #fbfbfb;
        padding: var(--padding);
        border-radius: var(--border-radius);
        > .md {
          width: 100%;
          margin-bottom: 5px;
        }
        > span {
          width: 100%;
          text-align: right;
          font-size: 12px;
          color: #d1d1d1;
        }
      }
      > .item:nth-last-child(1) {
        margin-bottom: 0 !important;
      }
      > .item::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: #bfc4cf;
        border: 1px solid #e4e7ed;
        top: 12px;
        left: -15px;
        border-radius: 50%;
      }
    }
  }
  > .bottom {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    color: #a1a1a1;
    font-size: 14px;
    font-weight: bold;
    > .pu,
    > .pr {
      padding: 3px 5px;
      background-color: white;
      color: white;
      border-radius: 5px;
    }
    > .pu {
      background-color: #010243;
      visibility: hidden;
    }
    > .pr {
      background-color: rgb(244 92 99);
    }
  }
}
</style>
