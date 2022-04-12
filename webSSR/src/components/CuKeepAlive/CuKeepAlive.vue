<script lang="ts">
import {
  ref,
  reactive,
  h,
  watch,
  toRef,
  onMounted,
  computed,
  VNode,
} from "vue";
import { Env } from "@/_d/Env";
export default {
  components: {},
  props: ["com_list", "com_key"],
  setup(props, ctx) {
    //虚拟dom缓存列表
    let vNodeCatch: Map<
      string,
      {
        vNode: VNode;
        /** 父元素 */
        parEl?: Element;
      }
    > = new Map();
    //
    return () => {
      let comList = props.com_list;
      let key = props.com_key;
      let onCom = comList[key];
      if (!vNodeCatch.has(key)) {
        let item = {
          vNode: h(onCom),
          parEl: undefined,
        };
        vNodeCatch.set(key, item);
      }
      return [...vNodeCatch.keys()].map((_key) => {
        let item = vNodeCatch.get(_key)!;
        if (item.vNode.el) {
          //收集父节点
          if (typeof item.parEl == "undefined") {
            item.parEl = (item.vNode.el as Element).parentElement!;
          }
          //从父节点移除，转移到内存中
          if (_key != key) {
            (item.vNode.el as Element).parentElement?.removeChild(
              item.vNode.el as Element
            );
          } else {
            //重新添加到父节点
            item.parEl?.appendChild(item.vNode.el as Element);
          }
        }
        return item.vNode;
      });
    };
  },
};
</script>

<template>
  <div class="CuKeepAlive"></div>
</template>

<style scoped lang="scss">
.CuKeepAlive {
}
</style>
