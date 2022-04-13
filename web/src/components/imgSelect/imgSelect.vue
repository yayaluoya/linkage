<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Plus, Loading, UploadFilled } from "@element-plus/icons-vue";
import { FileApiCon } from "@/http/apiCon/FileApiCon";
import { Mes } from "@/mes/Mes";
export default {
  components: { Plus, Loading, UploadFilled },
  props: {
    img: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 1024 * 2,
    },
  },
  emits: ["update:img"],
  setup(_, ctx) {
    const fileRef = ref<HTMLInputElement>();
    const loading = ref(false);
    onMounted(() => {
      fileRef.value?.addEventListener("change", (e: any) => {
        let _file: File = e.target?.files?.[0];
        if (!_file) {
          return;
        }
        //对文件大小进行限制
        if (_file.size > _.size * 1024) {
          Mes.warning(`图片大小超过${_.size}kb`);
          return;
        }
        //
        loading.value = true;
        //或者上传图片
        FileApiCon.instance
          .updateALIYunOSS(_file)
          .then((_str) => {
            //抛出事件
            ctx.emit("update:img", _str);
          })
          .finally(() => {
            loading.value = false;
          });
      });
    });
    function selectFile() {
      if (loading.value) {
        return;
      }
      fileRef.value?.click();
    }
    return {
      fileRef,
      loading,
      selectFile,
    };
  },
};
</script>

<template>
  <div class="imgSelect" @click="selectFile">
    <div v-if="!img" class="mask">
      <el-icon>
        <Plus />
      </el-icon>
    </div>
    <div v-if="img" class="mask upload">
      <el-icon>
        <UploadFilled :size="size" />
      </el-icon>
    </div>
    <div v-if="loading" class="mask">
      <el-icon>
        <Loading />
      </el-icon>
    </div>
    <el-image v-if="img" :src="img" alt="" fit="cover"></el-image>
    <input type="file" accept="image/*" ref="fileRef" />
  </div>
</template>

<style scoped lang="scss">
.imgSelect {
  --border-radius: 10px;
  width: 100px;
  height: 100px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius);
  border: 1px solid #dddddd;
  > .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: white;
    font-size: 30px;
    z-index: 2;
    > .el-icon {
      color: var(--color);
      font-weight: bold;
    }
    &.upload {
      background-color: rgb(0 0 0 / 10%);
      > .el-icon {
        color: #fbfbfb;
        opacity: 0.8;
      }
    }
  }
  > .el-image:deep() {
    width: 100%;
    height: 100%;
    z-index: 1;
    img {
      -webkit-user-drag: none;
    }
  }
  > input {
    display: none !important;
  }
}
</style>
