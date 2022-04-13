<script lang="ts">
import {
  ref,
  reactive,
  onUpdated,
  onBeforeUpdate,
  onMounted,
  watch,
  toRef,
  nextTick,
} from "vue";
import { Loading } from "@element-plus/icons-vue";
import { querySelector } from "-/querySelector";
export default {
  components: { Loading },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    showNumber: {
      type: Number,
      default: 2,
    },
    key: {
      type: String,
      default: "id",
    },
  },
  emits: ["touchBottom"],
  setup(props, ctx) {
    type list = {
      el?: HTMLDivElement;
      list: string[];
    };
    const loading = ref(false);
    const showList = ref<list[]>([]);
    /** 影子list */
    const showListShadow = ref<list[]>([]);
    /** 版本号 */
    let V = 0;

    /** 显示元素 */
    async function showItem() {
      loading.value = true;
      //递增版本
      let onV = ++V;
      //
      showListShadow.value = Array.from({
        length: props.showNumber!,
      }).map(() => {
        return {
          list: [],
        };
      });
      for (let item of props.list) {
        //必须在下一个任务中执行，因为依赖了h5中的元素
        await new Promise<void>((r, e) => {
          setTimeout(async () => {
            //找当前最短的那个列表
            let i = -1;
            for (let [index, _] of showListShadow.value.entries()) {
              //获取最后一个元素中的所有图片元素
              let lastElImgs = querySelector<HTMLImageElement>(
                _.el!.lastElementChild as any,
                (el) => {
                  return el.tagName == "IMG";
                }
              );
              //需要等到元素中所有图片加载完成后再继续下一步流程
              await Promise.all(
                lastElImgs.map((img) => {
                  return new Promise<void>((r) => {
                    //如果图片已加载的话就直接解决
                    if (img.complete) {
                      r();
                    } else {
                      img.addEventListener("load", () => r());
                      img.addEventListener("error", () => r());
                    }
                    //最多60秒超时
                    setTimeout(r, 60);
                  });
                })
              ).then(() => {
                return new Promise((r) => {
                  setTimeout(r, 0);
                });
              });
              //如果版本不对直接退出
              if (onV != V) {
                return;
              }
              //
              if (i != -1) {
                if (
                  _.el!.getBoundingClientRect().height <
                  showListShadow.value[i].el!.getBoundingClientRect().height
                ) {
                  i = index;
                }
              } else {
                i = index;
              }
            }
            //当前版本正确且索引正确才能添加进目标列表
            if (onV == V && i != -1) {
              showListShadow.value[i].list.push((item as any)[props.key]);
            }
            r();
          }, 0);
        });
      }
      //这里版本一定要同步，不然会错乱的
      if (onV == V) {
        loading.value = false;
        //同步影子列表的内容
        showList.value = showListShadow.value;
        showListShadow.value = [];
      }
    }

    /** 获取某一项 */
    function getItem(key: string) {
      return props.list.find((item: any) => {
        return item[props.key] == key;
      });
    }

    watch([toRef(props, "showNumber"), props.list], () => {
      showItem();
    });

    onMounted(() => {
      showItem();
    });

    //
    return {
      loading,
      showList,
      getItem,
      showListShadow,
    };
  },
};
</script>

<template>
  <div
    class="waterfall_list"
    :class="{
      loading,
    }"
  >
    <div
      class="list"
      :style="{
        'grid-template-columns': `repeat(${showNumber}, calc(100%/${showNumber} - 10px))`,
      }"
      v-for="(list, __) in [showListShadow, showList]"
      :key="__"
      :class="{
        shadow: __ == 0,
      }"
    >
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        :ref="
          (el) => {
            item.el = el;
          }
        "
      >
        <slot v-for="_item in item.list" :key="_item" :item="getItem(_item)" />
      </div>
    </div>
    <div class="bottom" v-if="loading">
      <el-icon style="margin-right: 10px"><Loading /></el-icon> 加载中...
    </div>
  </div>
</template>

<style scoped lang="scss">
.waterfall_list {
  overflow: auto;
  position: relative;
  &.loading {
    overflow: hidden;
  }
  > .list {
    width: 100%;
    display: grid;
    justify-content: space-between;
    align-items: start;
    &.shadow {
      visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }
    > .item:deep() {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .item {
        margin-bottom: 20px;
      }
      .item:nth-last-child(1) {
        margin-bottom: 0;
      }
    }
  }
  > .bottom {
    width: 100%;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--color);
    font-weight: bold;
  }
}
</style>
