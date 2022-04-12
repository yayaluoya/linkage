<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import Paginate from ">/Paginate/Paginate.vue";
import { AdminApiCon } from "@/http/apiCon/main/AdminApiCon";
import { Mes } from "@/mes/Mes";
import ColorPicker from "@/components/ColorPicker/ColorPicker.vue";
import { ComVerify } from "com_utils/ComVerify";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { default as Color } from "color";

export default {
  components: {
    Paginate,
    ColorPicker,
    CircleCloseFilled,
  },
  props: {},
  setup(props, ctx) {
    const loading = ref(false);
    const addLoading = ref(false);
    const removeLoading = ref<number[]>([]);
    const paginate = reactive({
      page: 1,
      size: 50,
      length: 0,
    });
    const list = ref<EN.IBulletCommentE[]>([]);

    const model = reactive<Pick<EN.IBulletCommentE, "content" | "color">>({
      content: "",
      color: "",
    });

    /** 加载列表 */
    function loadList() {
      if (loading.value) {
        return;
      }
      loading.value = true;
      AdminApiCon.instance
        .getBC({
          page: paginate.page,
          size: paginate.size,
        })
        .then((res) => {
          paginate.length = res.length;
          list.value = res.list;
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loading.value = false;
        });
    }

    /** 分页改变 */
    function paginateChange(n: number) {
      if (loading.value) {
        return;
      }
      paginate.page = n;
      loadList();
    }

    /** 添加弹幕 */
    function addBc() {
      if (addLoading.value) {
        return;
      }
      //验证字段
      let mes =
        ComVerify.BulletCommentV.color(model.color) ||
        ComVerify.BulletCommentV.content(model.content);
      if (mes) {
        Mes.error(mes);
        return;
      }
      //
      addLoading.value = true;
      AdminApiCon.instance
        .addBC({
          ...model,
        })
        .then((res) => {
          list.value.unshift(res);
          Mes.success("添加成功");
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          addLoading.value = false;
        });
    }

    /** 删除列表 */
    function remove(id: number) {
      if (removeLoading.value.includes(id)) {
        return;
      }
      removeLoading.value.push(id);
      AdminApiCon.instance
        .removeBC(id)
        .then(() => {
          Mes.success("删除成功");
          let index = list.value.findIndex((item) => {
            return item.id == id;
          });
          if (index != -1) {
            list.value.splice(index, 1);
          }
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          removeLoading.value = removeLoading.value.filter((_) => _ != id);
        });
    }

    onMounted(() => {
      loadList();
    });

    return {
      loading,
      paginate,
      list,
      paginateChange,
      model,
      addBc,
      addLoading,
      remove,
      removeLoading,
      Color,
    };
  },
};
</script>

<template>
  <div class="bc">
    <div class="con">
      <ColorPicker v-model.color="model.color" />
      <el-input clearable placeholder="输入弹幕内容" v-model="model.content" />
      <my-button :loading="addLoading" @click="addBc">添加</my-button>
    </div>
    <div class="list" v-loading="loading">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        :style="{
          'background-color': item.color,
          color: Color(item.color).darken(0.7),
        }"
        v-loading="removeLoading.includes(item.id)"
      >
        {{ item.content }}
        <el-icon @click="remove(item.id)"><CircleCloseFilled /></el-icon>
      </div>
    </div>
    <my-null v-if="!loading && list.length <= 0" />
    <Paginate :paginate="paginate" class="page" @change="paginateChange" />
  </div>
</template>

<style scoped lang="scss">
.bc {
  > .con {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    > .el-input {
      margin-left: 10px;
    }
    > button {
      margin-left: 20px;
      width: 100px;
      height: 100%;
    }
  }
  > .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: -10px;
    > .item {
      margin-right: 10px;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: bold;
      border-radius: 10px;
      background-color: white;
      padding: 8px 10px;
      line-height: 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
      color: var(--color);
      > .el-icon {
        font-size: 16px;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
  > .page {
    justify-content: flex-end;
  }
}
</style>
