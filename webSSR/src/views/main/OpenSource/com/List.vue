<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import Paginate from ">/Paginate/Paginate.vue";
import { Mes } from "@/mes/Mes";
import { Star } from "@element-plus/icons-vue";
import moment from "moment";
export default {
  components: { Paginate, Star },
  props: {
    loadList: Function,
  },
  setup(props, ctx) {
    const loadingList = ref(false);
    const list = ref<GitN.IRepos[]>([]);
    const paginate = reactive({
      page: 1,
      size: 20,
      length: 0,
    });
    /** 分页改变 */
    function paginateChange(n: number) {
      if (loadingList.value) {
        return;
      }
      paginate.page = n;
      loadData();
    }

    /** 加载数据 */
    function loadData() {
      if (loadingList.value) {
        return;
      }
      loadingList.value = true;
      props.loadList!({
        page: paginate.page,
        per_page: paginate.size,
      })
        .then((res: ComN.IPageData<GitN.IRepos>) => {
          paginate.length = res.length;
          list.value.push(...res.list);
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loadingList.value = false;
        });
    }

    function getTime(str: string) {
      return moment(str).format("YYYY年M月D日 h:mm:ss");
    }

    /** 去用户首页 */
    function toHtml(url: string) {
      window.open(url);
    }

    onMounted(() => {
      loadData();
    });

    return {
      loadingList,
      list,
      paginate,
      paginateChange,
      toHtml,
      getTime,
    };
  },
};
</script>

<template>
  <div class="list">
    <div class="list" v-loading="loadingList">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="top">
          <img
            :src="item.owner.avatar_url"
            alt=""
            @click="toHtml(item.owner.html_url)"
          />
          <div>
            <span class="name" @click="toHtml(item.html_url)">{{
              item.name
            }}</span>
            <span class="d">{{ item.description }}</span>
            <div>
              <div class="i">
                <div
                  class="start"
                  :class="{
                    no: item.stargazers_count == 0,
                  }"
                >
                  <el-icon>
                    <Star></Star>
                  </el-icon>
                  <span>{{ item.stargazers_count }}</span>
                </div>
                <div class="language">{{ item.language }}</div>
              </div>
              <div class="time">
                <span>{{ getTime(item.updated_at) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-null v-if="!loadingList && list.length <= 0" />
    <Paginate
      :paginate="paginate"
      type="is"
      class="page"
      @change="paginateChange"
    />
  </div>
</template>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  > .list {
    display: flex;
    flex-direction: column;
    > .item {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
      > .top {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        > img {
          width: 25px;
          height: 25px;
          margin-right: 10px;
          border-radius: 50%;
          cursor: pointer;
        }
        > div {
          width: calc(100% - 35px);
          display: flex;
          flex-direction: column;
          > span {
            font-size: 17px;
            color: var(--color);
            margin-bottom: 4px;
          }
          > span.name {
            font-weight: bold;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          > span.d {
            font-size: 14px;
          }
          > span:nth-last-child(1) {
            margin-bottom: 0;
          }
          > div {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            > .i {
              font-size: 15px;
              display: flex;
              flex-direction: row;
              align-items: center;
              > div {
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-right: 20px;
                > .el-icon {
                  margin-right: 5px;
                }
                &.start:not(.no) {
                  --color: var(--color);
                  font-weight: bold;
                }
                &.language {
                  font-size: 14px;
                }
              }
              > div:nth-last-child(1) {
                margin-right: 0;
              }
            }
            > .time {
              color: #959595;
              font-weight: normal;
              font-size: 14px;
            }
          }
        }
      }
    }
    > .item:nth-last-child(1) {
      margin-bottom: 0;
    }
  }
}
</style>
