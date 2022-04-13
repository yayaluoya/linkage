<script lang="ts">
import { ref, reactive, customRef } from "vue";
import ImgSelect_ from ">/imgSelect/imgSelect.vue";
import Dialog from ">/Dialog/Dialog.vue";
import WHImgSelect from ">/WHImgSelect/WHImgSelect.vue";
export default {
  components: { Dialog, ImgSelect_, WHImgSelect },
  props: {
    show: {
      type: Boolean,
    },
  },
  emits: ["selectBack", "update:show"],
  setup(props, ctx) {
    /** 图片 */
    const img = ref("");
    /** 按钮操作 */
    function bottonCon(type: "off" | "yes") {
      //
      switch (type) {
        case "off":
          break;
        case "yes":
          ctx.emit("selectBack", img.value);
          break;
      }
      show_.value = false;
    }
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
    /** 是否打开图片库选择器 */
    const ifOpenImgBaseSelect = ref(false);

    /** 图片库选择回调 */
    function imgBaseSelectBack(_src: string) {
      img.value = _src;
    }

    //
    return {
      show_,
      img,
      ifOpenImgBaseSelect,
      imgBaseSelectBack,
      bottonCon,
    };
  },
};
</script>

<template>
  <Dialog v-model:show="show_">
    <div class="img_">
      <span> 本地图片仅支持 JPG、GIF、PNG 格式,并且文件小于 2MB。 </span>
      <div class="img_select">
        <ImgSelect_ v-model:img="img" />
        <my-button
          :type="ifOpenImgBaseSelect ? 'e' : ''"
          class="imgBase"
          @click="ifOpenImgBaseSelect = !ifOpenImgBaseSelect"
          >从图片库中选择</my-button
        >
      </div>
      <span> 请填入网络图片地址或选择本地图片 </span>
      <el-input v-model="img" placeholder="请输入图片地址" />
    </div>
    <WHImgSelect
      v-model:show="ifOpenImgBaseSelect"
      @selectBack="imgBaseSelectBack"
    />
    <template #bottom>
      <my-button style="margin-right: 10px" @click="bottonCon('off')"
        >取消</my-button
      >
      <my-button type="e" @click="bottonCon('yes')">确定</my-button>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.img_ {
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > span:nth-child(1) {
    width: calc(100% - 20px);
    border-radius: var(--border-radius);
    border: 1px solid #ff9494;
    color: #ff5757;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 14px;
  }
  > span:nth-child(3) {
    color: gray;
    margin: 10px 0;
    color: #878787;
  }
  > .img_select {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    > button {
      margin-left: 10px;
      width: 100px;
      height: 100px;
      border-radius: 10px;
    }
  }
  > .imgBase {
    margin-bottom: 10px;
  }
  > .el-input:deep() {
    input {
      background-color: var(--background-color);
    }
  }
}
</style>
