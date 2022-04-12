<script lang="ts">
import {
  ref,
  reactive,
  onDeactivated,
  onMounted,
  computed,
  onUnmounted,
} from "vue";
import { Head, Bottom } from ">/Main";
import { RouteRecordRawExport, useRoute, useRouter } from "vue-router";
import { EPage } from "@/router/EPage";
import { WindowState } from "@/element/WindowState";
import tabs2 from ">/tabs/tabs2.vue";
import { cssValue } from "@/const/cssValue";
import { UserDataProxy } from "@/localData/dataItem/UserDataProxy";
import UserTop from "./com/UserTop.vue";
import { FSTool } from "@/firstScreen/FSTool";
import { IMainMeta } from "./IMainMeta";

/** 路由配置 */
export const routeExportRaw: RouteRecordRawExport = {
  redirect: EPage.Home,
};

export default {
  components: { Head, Bottom, tabs2, UserTop },
  setup() {
    const topRef = ref<HTMLDivElement>();
    const route = useRoute();
    const router = useRouter();
    const ifShowHead = ref(false);
    const tabsList = computed<
      {
        title: string;
        url: string;
      }[]
    >(() => {
      let list = [
        {
          title: "首页",
          url: EPage.Home,
        },
        {
          title: "博客",
          url: EPage.Blog,
        },
        {
          title: "开源",
          url: EPage.OpenSource,
        },
        {
          title: "便签",
          url: EPage.Memo,
        },
        {
          title: "日记",
          url: EPage.Diary,
        },
        {
          title: "有趣的",
          url: EPage.Interesting,
        },
      ];
      if (UserDataProxy.instance.ifLogin) {
        list.push(
          ...[
            {
              title: "弹幕",
              url: EPage.Bc,
            },
            {
              title: "设置",
              url: EPage.Edit,
            },
          ]
        );
      }
      return list;
    });

    const tabsIndex = computed(() => {
      return tabsList.value.findIndex((item) => {
        return item.url == route.path;
      });
    });

    /** 根据页面滚动距离来确定是否显示顶部 */
    function scroll() {
      if (
        WindowState.instance.elementTransform.scrollInfo.pos.y +
          cssValue.headHeight.value >
        topRef.value!.getBoundingClientRect().height
      ) {
        if (!ifShowHead.value) {
          ifShowHead.value = true;
        }
      } else {
        if (ifShowHead.value) {
          ifShowHead.value = false;
        }
      }
    }

    /** tabs切换 */
    function tabsChange(n: number) {
      router.push({
        path: tabsList.value[n].url,
      });
    }

    onMounted(() => {
      WindowState.instance.on("scroll", null, scroll);
      FSTool.instance.hide();
      scroll();
    });
    onUnmounted(() => {
      WindowState.instance.off("scroll", null, scroll);
    });

    /** 是否自定义内容 */
    function ifCuContent(meta: IMainMeta): boolean {
      return meta.cuContent;
    }

    return {
      topRef,
      ifShowHead,
      tabsList,
      tabsIndex,
      tabsChange,
      ifCuContent,
    };
  },
};
</script>

<template>
  <div class="main_">
    <my-erect>
      <Head v-if="ifShowHead" />
      <div class="top" ref="topRef">
        <div class="content">
          <UserTop />
        </div>
        <tabs2
          class="tabs"
          :list="tabsList"
          :index="tabsIndex"
          @change="tabsChange"
        />
      </div>
      <router-view v-slot="{ Component, route }">
        <div :class="ifCuContent(route.meta) ? 'cuContent' : 'content'">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </div>
      </router-view>
      <Bottom />
      <template #s>
        <h1>YAYALUOYA的博客😀😁😂</h1>
      </template>
    </my-erect>
  </div>
</template>

<style scoped lang="scss">
.main_ {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  --top-height: 300px;
  > .top {
    --border-color: #f6f6f6;
    width: 100%;
    height: var(--top-height);
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;
    border-bottom: 2px solid var(--border-color);
    background-color: white;
    box-shadow: 0 0 8px rgb(0 0 0 / 12%);
    overflow: hidden;
    > .content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      position: relative;
    }
    > .tabs {
      width: var(--content-width);
      position: absolute;
      bottom: 0px;
      border: none;
      --background-color: rgb(255 255 255 / 80%);
      --on-color: white;
      --on-background-color: rgb(68 68 97 / 90%);
    }
  }
  > .cuContent {
    width: 100%;
    min-width: var(--content-width);
    min-height: calc(100vh - var(--top-height));
  }
  > .content {
    width: var(--content-width);
    min-height: calc(100vh - var(--top-height) - 40px);
    padding: 20px 0;
  }
}
</style>
