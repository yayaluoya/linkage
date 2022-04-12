<script lang="ts">
import { ref, reactive } from "vue";
import moment from "moment";
export default {
  components: {},
  props: {
    userInfo: Object,
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    /** 去用户首页 */
    function toHtml() {
      window.open(props.userInfo!.html_url);
    }

    function getTime(str: string) {
      return moment(str).format("YYYY年M月D日 h:mm:ss");
    }

    return {
      toHtml,
      getTime,
    };
  },
};
</script>

<template>
  <div class="userInfo box-shadow">
    <template v-if="loading">
      <el-skeleton :rows="3" animated />
    </template>
    <div class="top" v-else>
      <el-image class="img" :src="userInfo.avatar_url" fit="cover"></el-image>
      <!-- <img :src="userInfo.avatar_url" alt="" /> -->
      <div class="content">
        <span class="name" @click="toHtml">{{ userInfo.name }}</span>
        <span class="email" v-if="userInfo.email">{{ userInfo.email }}</span>
        <span class="time">{{ getTime(userInfo.created_at) }}</span>
      </div>
    </div>
    <span>{{ userInfo.bio }}</span>
  </div>
</template>

<style scoped lang="scss">
.userInfo {
  width: calc(100% - var(--padding) * 2);
  padding: var(--padding);
  background-color: white;
  margin-bottom: 20px;
  border-radius: var(--border-radius);
  > .top {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    > .img {
      width: 100px;
      height: 100px;
      border-radius: var(--border-radius);
      margin-right: 10px;
      box-shadow: 1px 1px 2px 0 rgb(0 0 0 / 12%);
    }
    > .content {
      width: calc(100% - 110px - 20px);
      display: flex;
      flex-direction: column;
      padding: 10px;
      > span {
        font-size: 18px;
        color: var(--color);
        margin-bottom: 10px;
      }
      > span.name {
        font-weight: bold;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      > span.email {
      }
      > span.time {
        font-size: 14px;
      }
      > span:nth-last-child(1) {
        margin-bottom: 0;
      }
    }
  }
  > span {
    font-size: 16px;
    color: var(--color);
  }
}
</style>
