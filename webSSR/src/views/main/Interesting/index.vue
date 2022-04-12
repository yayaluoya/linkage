<script lang="ts">
import { ref, reactive } from "vue";
import { EPage } from "@/router/EPage";
import { PageTool } from "@/router/PageTool";
export default {
  components: {},
  props: {},
  setup(props, ctx) {
    const list: any[] = [
      {
        title: "像素大战拼图",
        url: EPage.Pixel,
      },
    ];

    /** 去目标页面 */
    function to(url: EPage) {
      PageTool.toBackPage(url);
    }

    return {
      list,
      to,
    };
  },
};
</script>

<template>
  <div class="interesting">
    <div
      class="item"
      v-for="(item, index) in list"
      :key="index"
      @click="to(item.url)"
    >
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.interesting {
  display: flex;
  flex-direction: column;
  > .item {
    width: 100%;
    display: inline-flex;
    padding: var(--padding);
    background-color: white;
    border-radius: var(--border-radius);
    margin-bottom: 20px;
    text-align: center;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    > span {
      font-size: 24px;
      font-weight: bold;
      color: var(--color);
    }
    &:hover {
      > span {
        text-decoration: underline;
      }
    }
  }
  > .item:nth-last-child(1) {
    margin-bottom: 0;
  }
}
</style>