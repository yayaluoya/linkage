<script lang="ts">
import { ref, reactive } from "vue";
import MDShow from ">/md/MDShow.vue";
import moment from "moment";
import { AdminApiCon } from "@/http/apiCon/main/AdminApiCon";
import { Mes } from "@/mes/Mes";
import { headImg } from "@/const/headImg";
export default {
  components: { MDShow },
  props: {
    item: Object,
    if_edit: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["d"],
  setup(props, ctx) {
    const loading = ref(false);

    /** 获取时间 */
    function getTime(_s: string | number) {
      return moment(parseInt(_s + "")).format("YYYY年M月D日 H:m:s");
    }

    /** 删除这条评论 */
    function remove() {
      loading.value = true;
      AdminApiCon.instance
        .removeBlogC(props.item!.id)
        .then(() => {
          Mes.success("删除成功");
          ctx.emit("d", props.item!.id);
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loading.value = false;
        });
    }

    return {
      headImg,
      loading,
      getTime,
      remove,
    };
  },
};
</script>

<template>
  <div
    class="commentItem"
    :class="{
      mark: item.mark,
    }"
  >
    <div class="content">
      <div class="left">
        <el-image class="img" :src="item.img || headImg" fit="cover"></el-image>
      </div>
      <div class="right">
        <div class="top">
          <span>
            {{ item.name || "😀" }}
            <svg-icon
              style="margin-left: 2px"
              v-if="item.mark"
              name="focal_point"
            />
          </span>
          <span>{{ getTime(item.createTime) }}</span>
        </div>
        <MDShow
          class="md"
          :content="item.content"
          :md_theme="item.theme.md"
          :code_theme="item.theme.code"
        />
      </div>
    </div>
    <div class="con" v-if="if_edit">
      <my-button :loading="loading" @click="remove">删除</my-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.commentItem {
  --img-size: 30px;
  --img-margin-right: 10px;
  display: flex;
  flex-direction: column;
  > .content {
    display: flex;
    flex-direction: row;
    > .left {
      width: var(--img-size);
      height: var(--img-size);
      margin-right: var(--img-margin-right);
      border: 1px solid #dddddd;
      border-radius: 50%;
      overflow: hidden;
      > .img {
        width: 100%;
        height: 100%;
      }
    }
    > .right {
      width: calc(100% - var(--img-size) - var(--img-margin-right));
      display: flex;
      flex-direction: column;
      > .top {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        > span:nth-child(1) {
          color: var(--color);
          font-size: 14px;
          font-weight: bold;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        > span:nth-child(2) {
          color: #afafaf;
          font-size: 12px;
        }
      }
      > .md {
        width: calc(100% - 20px);
        max-height: 400px;
        overflow: auto;
        border: 1px solid var(--border-color);
        padding: 10px;
        border-radius: var(--border-radius);
        border-top-left-radius: 0;
      }
    }
  }
  > .con {
    text-align: right;
    margin-top: 10px;
  }
}
</style>
