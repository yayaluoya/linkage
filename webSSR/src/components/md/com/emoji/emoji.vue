<script lang="ts">
import { ref, reactive, customRef, onMounted } from "vue";
import Dialog from ">/Dialog/Dialog.vue";
import Tab2_ from ">/tabs/tabs2.vue";
import { ComApiCon } from "@/http/apiCon/main/ComApiCon";
import { inViewport_ } from "@/utils/inViewport";
import { Mes } from "@/mes/Mes";
export default {
  components: { Dialog, Tab2_ },
  props: {
    show: {
      type: Boolean,
    },
  },
  emits: ["selectBack", "update:show"],
  setup(props, ctx) {
    const elRef = ref();
    const tabList = ref([
      {
        title: "emoji",
      },
      // {
      //   title: "符号",
      // },
    ]);
    const onTabIndex = ref(0);
    /** 一个自定义的ref */
    const show_ = customRef((track, trigger) => {
      return {
        get: () => {
          track();
          return props.show;
        },
        set: (_value) => {
          ctx.emit("update:show", _value);
          trigger();
        },
      };
    });
    const loading = ref(false);
    const content = ref<{
      emoji: any[];
      symbol: any[];
    }>({
      emoji: [],
      symbol: [],
    });

    /** 插入表情 */
    function itemClick(item: string) {
      ctx.emit("selectBack", item);
    }

    /** 获取表情符 */
    function getEmoji() {
      loading.value = true;
      ComApiCon.instance
        .getEmoji()
        .then((list) => {
          // console.log(list);
          content.value.emoji = list;
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loading.value = false;
        });
    }

    onMounted(() => {
      inViewport_(elRef.value, {}, () => {
        getEmoji();
      });
    });

    return {
      elRef,
      show_,
      itemClick,
      tabList,
      onTabIndex,
      loading,
      content,
    };
  },
};
</script>

<template>
  <Dialog v-model:show="show_">
    <div class="emoji_" ref="elRef" v-loading="loading">
      <Tab2_ :list="tabList" v-model:index="onTabIndex" />
      <div class="content">
        <div class="emoji" v-show="onTabIndex == 0">
          <div v-for="(item, index) in content.emoji" :key="index">
            <span>{{ item.title }}</span>
            <div class="emoji_List">
              <span
                v-for="(_item, _index) in item.list"
                :key="_index"
                @click="itemClick(_item)"
                >{{ _item }}</span
              >
            </div>
          </div>
        </div>
        <div class="symbol emoji_List" v-show="onTabIndex == 1">
          <span
            v-for="(item, index) in content.symbol"
            :key="index"
            @click="itemClick(item)"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style scoped lang="scss">
.emoji_ {
  width: 700px;
  > .content {
    max-height: 300px;
    overflow: auto;
    padding: 10px;
    margin-top: 10px;
    > .emoji {
      display: flex;
      flex-direction: column;
      > div {
        display: flex;
        flex-direction: column;
        > span {
          color: #666;
          font-size: 16px;
          font-weight: bold;
          padding: 0 0 10px 0;
        }
      }
    }
    .emoji_List {
      display: grid;
      grid-template-columns: repeat(10, auto);
      grid-row-gap: 5px;
      margin-bottom: 10px;
      > span {
        width: 40px;
        height: 40px;
        font-size: 25px;
        padding: 3px;
        border-radius: var(--border-radius);
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        border: 1px solid transparent;
        &:hover {
          background-color: var(--background-color);
          border-color: var(--border-color);
          font-size: 31px;
        }
      }
    }
  }
}
</style>
