<script lang="ts">
import { ref, reactive, onMounted, Component } from "vue";
import { FSTool } from "@/firstScreen/FSTool";
import { headImg } from "@/const/headImg";
import { useRouter } from "vue-router";
import { EPage } from "@/router/EPage";
export default {
  components: {},
  setup(_, ctx) {
    const router = useRouter();
    const head_portrait = ref<any>();

    onMounted(() => {
      // console.log(head_portrait.value.$el);
      FSTool.instance.hide(head_portrait.value.$el);
    });

    /** 去首页 */
    function toHome() {
      router.push({
        path: EPage.Home,
      });
    }

    return {
      head_portrait,
      headImg,
      toHome,
    };
  },
};
</script>

<template>
  <div class="head">
    <div class="content">
      <div class="user" @click="toHome">
        <el-image
          class="img"
          :src="headImg"
          fit="cover"
          alt="yayaluoya-headPortrait"
          ref="head_portrait"
        ></el-image>
        <span>YAYALUOYA</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: var(--head-heigin);
  background-color: white;
  // border-bottom: 1px solid var(--border-color-dark);
  box-shadow: 0 0 8px rgb(0 0 0 / 5%);
  > .content {
    width: var(--content-width);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    > .user {
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      > .el-image {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid #dddddd;
        margin-right: 10px;
      }
      > span {
        font-size: 18px;
        color: var(--color);
        font-weight: bold;
      }
    }
  }
}
</style>
