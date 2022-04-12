<script lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import Gitee from "./com/Gitee.vue";
import Github from "./com/Github.vue";
import { SSROpT } from "@/erect/SSROpT";
export default {
  ...SSROpT.inject({
    asyncHeadLabel() {
      return {
        title: "开源",
      };
    },
  }),
  components: {},
  setup(props, ctx) {
    const tabs = [
      {
        icon: "https://gitee.com/assets/favicon.ico",
        name: "Gitee",
        com: Gitee,
      },
      {
        icon: "https://github.githubassets.com/favicons/favicon.png",
        name: "Github",
        com: Github,
      },
    ];
    const onTabIndex = ref(0);
    const component = computed(() => {
      return tabs[onTabIndex.value].com;
    });
    return {
      tabs,
      onTabIndex,
      component,
    };
  },
};
</script>

<template>
  <div class="openSource">
    <div class="left box-shadow">
      <div
        class="item"
        v-for="(item, index) in tabs"
        :key="index"
        :class="{
          on: onTabIndex == index,
        }"
        @click="onTabIndex = index"
      >
        <img :src="item.icon" alt="" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="right">
      <keep-alive>
        <component :is="component"></component>
      </keep-alive>
    </div>
  </div>
</template>

<style scoped lang="scss">
.openSource {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  --left-width: 200px;
  --left-margin-right: 20px;
  > .left {
    width: calc(var(--left-width) - var(--padding) * 2);
    margin-right: var(--left-margin-right);
    padding: var(--padding);
    border-radius: var(--border-radius);
    background-color: white;
    display: flex;
    flex-direction: column;
    > .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s;
      padding: 5px;
      border-radius: var(--border-radius);
      > img {
        width: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
      > span {
        font-size: 18px;
        color: var(--color);
        font-weight: bold;
      }
      &:hover {
        background-color: var(--background-color);
      }
      &.on {
        > span {
          color: #0084ff;
        }
      }
    }
  }
  > .right {
    width: calc(100% - var(--left-width) - var(--left-margin-right));
  }
}
</style>
