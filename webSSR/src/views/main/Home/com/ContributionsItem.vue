<script lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { EPage } from "@/router/EPage";
import { getObscureQueryStr } from "@/utils/getObscureQueryValue";
import { PageTool } from "@/router/PageTool";
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    number: {
      type: Number,
      default: 1,
    },
  },
  setup(props, ctx) {
    const router = useRouter();
    const item: EN.IContributionsE = props.item as any;

    const title = computed(() => {
      let con = {
        add: `<span style="margin-right: 5px">添加</span>`,
        edit: `<span style="margin-right: 5px">修改</span>`,
      }[item.conType];
      let text = "";
      switch (item.type) {
        case "blog":
          let data: EN.IBlogE = item.data;
          if (data.externalLink) {
            text = "一篇外链博客";
          } else {
            text = "一篇博客";
          }
          break;
        case "memo":
          text = "一条便签";
          break;
        case "diary":
          text = "一篇日记";
          break;
        case "bullet":
          text = "一条弹幕";
          break;
      }
      return `${con}了${text}${
        props.number > 1
          ? `<span style="margin-left: 5px;">${props.number}次</span>`
          : ""
      }`;
    });
    const content = computed(() => {
      switch (item.type) {
        case "blog":
          let blogD = item.data as EN.IBlogE;
          return blogD.title;
        case "memo":
          let memoD = item.data as EN.IMemoE;
          return memoD.title;
        case "diary":
          let diaryD = item.data as EN.IDiaryE;
          return diaryD.title;
        case "bullet":
          let bulletD = item.data as EN.IBulletCommentE;
          return bulletD.content;
      }
    });

    /** 去对应页面 */
    function to(v = false): boolean {
      switch (item.type) {
        case "blog":
          if (v) return true;
          PageTool.toBackPage(EPage.BlogShow, {
            id: getObscureQueryStr(item.targetId + ""),
          });
          break;
        case "memo":
          break;
        case "diary":
          break;
        case "bullet":
          break;
      }
      return false;
    }

    return {
      title,
      content,
      to,
    };
  },
};
</script>

<template>
  <div class="ContributionsItem">
    <span class="title" v-html="title"></span>
    <span
      @click="to()"
      class="content"
      :class="{
        link: to(true),
      }"
      >{{ content }}</span
    >
  </div>
</template>

<style scoped lang="scss">
.ContributionsItem {
  font-size: 18px;
  > .title {
    color: #b3b3c5;
  }
  > .content {
    margin-left: 10px;
    color: var(--color);
  }
  .link {
    color: #0084ff;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
