<script lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { cssValue } from "@/const/cssValue";
import Se from ">/Se/Se.vue";
import { ComApiCon } from "./http/apiCon/main/ComApiCon";
import { JSONPar } from "./utils/JSONPar";
import { Mes } from "./mes/Mes";
import { UserEvent } from "./event/UserEvent";
export default {
  components: { Se },
  setup() {
    const cssValue_ = computed(() => {
      return Object.keys(cssValue).reduce((a: any, b: string) => {
        a[b] = (cssValue as any)[b].tem.replace(
          "$",
          (cssValue as any)[b].value
        );
        return a;
      }, {});
    });

    /** 特效 */
    const se = reactive({
      list: [],
      opacity: 0,
    });

    /** 获取数据 */
    function getData() {
      ComApiCon.instance
        .getUser()
        .then((data) => {
          let themeData = JSONPar(data.dataE?.themeData, {
            main_background_se: [],
            main_background_se_opacity: 0,
          });
          se.list = themeData.main_background_se || [];
          se.opacity = themeData.main_background_se_opacity || 0;
        })
        .catch(Mes.handleHttpCatch);
    }

    onMounted(() => {
      getData();
      //监听更新info事件，同步更新数据
      UserEvent.instance.on("updateInfo", null, getData);
    });

    onUnmounted(() => {
      //取消更新info事件的监听
      UserEvent.instance.off("updateInfo", null, getData);
    });

    return {
      cssValue_,
      se,
    };
  },
};
</script>

<template>
  <div class="root">
    <Se
      class="se"
      :se="item"
      :style="{
        opacity: se.opacity,
      }"
      v-for="(item, index) in se.list"
      :key="index"
    />
    <div class="content">
      <router-view v-slot="{ Component }">
        <!-- 注意：这里加缓存有些不好形容的问题，跟vue-router的工作原理有关系 -->
        <!-- <keep-alive> -->
        <component :is="Component" />
        <!-- </keep-alive> -->
      </router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.root {
  --head-heigin: v-bind("cssValue_.headHeight");
  --content-width: v-bind("cssValue_.contentWidth");
  width: 100%;

  > .se {
    z-index: 0;
  }

  > .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
  }
}
</style>
