<script lang="ts">
import { ref, reactive, computed, onMounted, toRef, watch } from "vue";
import Add from "./com/Add.vue";
import Item from "./com/Item.vue";
import { UserDataProxy } from "@/localData/dataItem/UserDataProxy";
import Paginate from ">/Paginate/Paginate.vue";
import { ComApiCon } from "@/http/apiCon/main/ComApiCon";
import { Mes } from "@/mes/Mes";
import waterfallList from ">/waterfallList/waterfallList.vue";
import { SSROpT } from "@/erect/SSROpT";
export default {
  ...SSROpT.inject({
    asyncHeadLabel() {
      return {
        title: "日记",
      };
    },
  }),
  components: { Add, Item, Paginate, waterfallList },
  setup() {
    const ifLogin = computed(() => {
      return UserDataProxy.instance.ifLogin;
    });
    const loading = ref(false);
    const query = reactive({
      str: "",
    });
    const list = ref<EN.IDiaryE[]>([]);
    const paginate = reactive({
      page: 1,
      size: 8,
      length: 0,
    });
    const conData = reactive<
      ToolN.DataCon<EN.IDiaryE> & {
        show: boolean;
      }
    >({
      show: false,
      type: "",
      data: undefined,
    });

    /** 查找点击 */
    function findClick() {
      if (loading.value) {
        return;
      }
      paginate.page = 1;
      paginate.length = 0;
      list.value.length = 0;
      find();
    }

    /** 查找 */
    function find() {
      if (loading.value) {
        return;
      }
      loading.value = true;
      ComApiCon.instance
        .findDiary({
          page: paginate.page,
          size: paginate.size,
          query: {
            str: query.str,
          },
        })
        .then((res) => {
          paginate.length = res.length;
          list.value.push(...res.list);
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loading.value = false;
        });
    }

    /** 添加 */
    function add(item?: EN.IDiaryE) {
      conData.type = item ? "edit" : "add";
      conData.data = item;
      conData.show = true;
    }

    /** 编辑子项事件 */
    function editItem(conData: ToolN.DataCon<EN.IDiaryE>) {
      let onIndex = list.value.findIndex((item) => {
        return item.id == conData.data?.id;
      });
      if (onIndex == -1) {
        list.value.unshift(conData.data!);
      } else {
        list.value.splice(onIndex, 1, conData.data!);
      }
    }

    watch(toRef(conData, "show"), () => {
      if (!conData.show) {
        conData.type = "";
        conData.data = undefined;
      }
    });

    /** 分页改变 */
    function paginateChange(n: number) {
      if (loading.value) {
        return;
      }
      paginate.page = n;
      find();
    }

    onMounted(() => {
      find();
    });

    return {
      ifLogin,
      loading,
      query,
      list,
      find,
      findClick,
      conData,
      add,
      paginate,
      paginateChange,
      editItem,
    };
  },
};
</script>

<template>
  <div class="diary">
    <Add v-model:show="conData.show" :conData="conData" @edit="editItem" />
    <div class="query">
      <el-input
        clearable
        placeholder="输入要查找的日记"
        v-model="query.str"
        @change="findClick"
      />
      <my-button @click="findClick">查找</my-button>
      <my-button type="e" @click="add()" v-if="ifLogin">添加</my-button>
    </div>
    <div class="list" v-loading="loading">
      <waterfallList :list="list" :ifState="false" #default="{ item }">
        <Item class="item" :data="item" @edit="add(item)" />
      </waterfallList>
    </div>
    <my-null v-if="!loading && list.length <= 0" />
    <Paginate
      class="page"
      type="is"
      :paginate="paginate"
      @change="paginateChange"
    />
  </div>
</template>

<style scoped lang="scss">
.diary {
  > .query {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    > .el-input {
    }
    > button {
      margin-left: 20px;
      width: 100px;
      height: 100%;
    }
  }
  > .list {
    width: 100%;
  }
  > .page {
    justify-content: flex-end;
  }
}
</style>
