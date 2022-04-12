<script lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import Contributions from ">/Contributions/Contributions.vue";
import { ComApiCon } from "@/http/apiCon/main/ComApiCon";
import { Mes } from "@/mes/Mes";
import Paginate from ">/Paginate/Paginate.vue";
import ContributionsItem from "./com/ContributionsItem.vue";
import moment from "moment";
import { dateT } from "-/dateT";
import { SSROpT } from "@/erect/SSROpT";

type dateType = {
  /** 年 */
  y: number;
  /** 月 */
  m: number;
  /** 日 */
  d: number;
};
export default {
  ...SSROpT.inject({
    asyncHeadLabel() {
      return {
        title: "首页",
      };
    },
  }),
  components: { Contributions, Paginate, ContributionsItem },
  setup() {
    const loading = ref(false);
    const paginate = reactive({
      page: 1,
      size: 20,
      length: 0,
    });
    const query = reactive<Partial<dateType>>({});
    const list = ref<EN.IContributionsE[]>([]);
    //显示的列表，主要是把每一天的提取出来
    const showList = computed(() => {
      let ls: {
        key: string;
        time: string;
        list: {
          value: EN.IContributionsE;
          number: number;
        }[];
      }[] = [];
      list.value.forEach((item) => {
        let key = `${item.y}-${item.m}-${item.d}`;
        let onLs = ls.find((_) => {
          return _.key == key;
        });
        if (onLs) {
          let onItem = onLs.list.find((_) => {
            return (
              _.value.type == item.type && _.value.targetId == item.targetId
            );
          });
          if (onItem) {
            onItem.number++;
          } else {
            onLs.list.push({
              value: item,
              number: 1,
            });
          }
        } else {
          let m = moment(key, "YYYY-M-D");
          ls.push({
            key,
            time: `${m.format("YYYY-M-D")} ${dateT.ZHWeek(m.day())}`,
            list: [
              {
                value: item,
                number: 1,
              },
            ],
          });
        }
      });
      return ls;
    });

    /** 加载数据 */
    function loadData() {
      if (loading.value) {
        return;
      }
      loading.value = true;
      ComApiCon.instance
        .pageContributionList({
          size: paginate.size,
          page: paginate.page,
          query: {
            y: query.y,
            m: query.m,
            d: query.d,
          },
        })
        .then((data) => {
          paginate.length = data.length;
          list.value.push(...data.list);
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
      loadData();
    }

    /** 贡献子项点击 */
    function contributionItemClick(item: Partial<dateType>) {
      item = { ...item };
      if (loading.value) {
        return;
      }
      //如果重复点击的话就清空查询条件
      if (query.y == item.y && query.m == item.m && query.d == item.d) {
        delete item.y;
        delete item.m;
        delete item.d;
      }
      query.y = item.y;
      query.m = item.m;
      query.d = item.d;
      paginate.page = 1;
      paginate.length = 0;
      list.value.length = 0;
      loadData();
    }

    onMounted(() => {
      loadData();
    });

    return {
      loading,
      paginate,
      query,
      showList,
      contributionItemClick,
      paginateChange,
    };
  },
};
</script>

<template>
  <div class="home">
    <Contributions class="contribution" @itemClick="contributionItemClick" />
    <div class="list" v-loading="loading">
      <div class="item" v-for="(item, index) in showList" :key="index">
        <span>{{ item.time }}</span>
        <div class="list">
          <ContributionsItem
            class="item"
            :style="{
              '--b-c': {
                add: '#92ffa5',
                edit: '#7c9fff',
              }[_item.value.conType],
            }"
            v-for="(_item, _index) in item.list"
            :key="_index"
            :item="_item.value"
            :number="_item.number"
          />
        </div>
      </div>
      <my-null v-if="!loading && showList.length <= 0" />
    </div>
    <Paginate
      :paginate="paginate"
      type="is"
      class="page"
      @change="paginateChange"
    />
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  > .contribution {
    margin-bottom: 20px;
  }
  > .list {
    width: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    > .item {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      > span {
        font-size: 16px;
        font-weight: bold;
        color: var(--color);
        margin-bottom: 10px;
        padding: 8px;
        text-shadow: #ffffff 1px 0 0, #ffffff 0 1px 0, #ffffff -1px 0 0,
          #ffffff 0 -1px 0;
      }
      > .list {
        width: calc(100% - 140px);
        margin: 0 30px;
        display: flex;
        flex-direction: column;
        padding: 0 40px;
        border-left: 2px solid #e4e7ed;
        > .item {
          --b-c: #e4e7ed;
          margin-bottom: 20px;
          position: relative;
          display: flex;
          justify-content: left;
          align-items: center;
        }
        > .item:nth-last-child(1) {
          margin-bottom: 0;
        }
        > .item::before {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: var(--b-c);
          border: 2px solid white;
          left: -48px;
          border-radius: 50%;
        }
      }
    }
    > .item:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
  > .page {
    width: calc(100% - 100px);
    margin: 0 50px;
    margin-top: 10px;
  }
}
</style>
