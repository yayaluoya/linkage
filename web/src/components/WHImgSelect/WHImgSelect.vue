<script lang="ts">
import { ref, reactive, customRef, onMounted, watch } from "vue";
import Dialog from ">/Dialog/Dialog.vue";
import tabs2_ from ">/tabs/tabs2.vue";
import { WallhavenApiCon } from "@/http/apiCon/WallhavenApiCon";
import { getImgUrl, ifLoadCom } from "./getImgUrl";
import Paginate from ">/Paginate/Paginate.vue";
export default {
  components: { Dialog, tabs2_, Paginate },
  props: {
    show: {
      type: Boolean,
    },
  },
  emits: ["selectBack", "update:show"],
  setup(props, ctx) {
    const WHImgSelectRef = ref();
    const show_ = customRef((track, trigger) => {
      return {
        get() {
          track();
          return props.show;
        },
        set(value) {
          ctx.emit("update:show", value);
          trigger();
        },
      };
    });
    const loading = ref(false);
    const typeList = [
      {
        type: "latest",
        title: "最新",
      },
      {
        type: "toplist",
        title: "排行榜",
      },
      {
        type: "random",
        title: "随机",
      },
    ];
    const onTypeIndex = ref(0);
    /** 数据列表 */
    const dataList = reactive<{
      onPage: number;
      page: number;
      size: number;
      length: number;
      list: {
        /** 缩略图地址 */
        thumbnailUrl: string;
        /** 详情地址 */
        detailsUrl: string;
      }[];
    }>({
      onPage: 0,
      page: 1,
      size: 24,
      length: 0,
      list: [],
    });
    /** 加载列表映射 */
    const loadingList = ref<string[]>([]);
    /** 数据版本 */
    const dataV = ref(1);

    /** 监听类型更改并重置数据 */
    watch(onTypeIndex, () => {
      dataV.value++;
      dataList.onPage = 0;
      dataList.page = 1;
      loading.value = false;
      //重新加载数据
      loadingData();
    });

    /** 加载数据 */
    function loadingData() {
      if (loading.value || dataList.page == dataList.onPage) {
        return;
      }
      loading.value = true;
      let _dataV = dataV;
      dataList.onPage = dataList.page;
      WallhavenApiCon.instance
        .page({
          page: dataList.page,
          type: typeList[onTypeIndex.value].type,
        })
        .then((res) => {
          if (_dataV != dataV) {
            return;
          }
          dataList.list = res.list;
          dataList.length =
            res.list.length == dataList.size
              ? dataList.page * dataList.size + 1
              : (dataList.page - 1) * dataList.size + res.list.length;
        })
        .finally(() => {
          if (_dataV != dataV) {
            return;
          }
          loading.value = false;
        });
    }

    /** 页码改变 */
    function paginateChange(_page: number) {
      dataList.page = _page;
      //加载数据
      loadingData();
    }

    /** 获取真实图片地址 */
    function getImgUrl_(detailsUrl: string): Promise<string> {
      loadingList.value.push(detailsUrl);
      return getImgUrl(detailsUrl).then((url) => {
        let index = loadingList.value.findIndex((item) => {
          return item == detailsUrl;
        });
        if (index != -1) {
          loadingList.value.splice(index, 1);
        }
        return url;
      });
    }

    /** 选择图片版本 */
    let selectImgV = 0;
    /** 图片点击 */
    function imageClick(detailsUrl: string) {
      selectImgV++;
      let v = selectImgV;
      getImgUrl_(detailsUrl).then((url) => {
        //必须版本一样才能回调，取用户最后选择的那张图片
        if (v == selectImgV) {
          ctx.emit("selectBack", url);
          show_.value = false;
        }
      });
    }

    /** 大图地址 */
    const maxImageUrl = ref({
      detailsUrl: "",
      url: "",
    });
    const ifShowMaxImage = customRef((a, b) => {
      return {
        get() {
          a();
          return !!maxImageUrl.value.url;
        },
        set(value) {
          if (!value) {
            maxImageUrl.value.url = "";
            maxImageUrl.value.detailsUrl = "";
          }
          b();
        },
      };
    });
    /** 大图显示 */
    function maxImgShow(detailsUrl: string) {
      getImgUrl_(detailsUrl).then((img) => {
        maxImageUrl.value.url = img;
        maxImageUrl.value.detailsUrl = detailsUrl;
      });
    }

    /** 图片是否在加载中 */
    function ifLoading(detailsUrl: string) {
      return loadingList.value.includes(detailsUrl);
    }

    onMounted(() => {
      loadingData();
    });

    return {
      WHImgSelectRef,
      show_,
      loading,
      typeList,
      onTypeIndex,
      dataList,
      maxImageUrl,
      ifShowMaxImage,
      paginateChange,
      loadingData,
      imageClick,
      ifLoading,
      maxImgShow,
      ifLoadCom,
    };
  },
};
</script>

<template>
  <!-- 从WH图片库中选取图片 -->
  <Dialog :margin_top="0" v-model:show="show_" title="WH图片库">
    <div class="WHImgSelect" v-loading="loading" ref="WHImgSelectRef">
      <tabs2_ :list="typeList" v-model:index="onTypeIndex" />
      <div class="list">
        <div
          class="item"
          :class="{
            on:
              ifLoading(item.detailsUrl) ||
              maxImageUrl.detailsUrl == item.detailsUrl,
            com: ifLoadCom(item.detailsUrl),
          }"
          v-for="(item, index) in dataList.list"
          :key="index"
          v-loading="ifLoading(item.detailsUrl)"
        >
          <div class="state"></div>
          <div class="con">
            <my-button @click="maxImgShow(item.detailsUrl)">大图</my-button>
            <my-button
              @click="
                () => {
                  imageClick(item.detailsUrl);
                }
              "
              >选择</my-button
            >
          </div>
          <!-- <img :src="item.thumbnailUrl" alt="" /> -->
          <el-image class="img" :src="item.thumbnailUrl" fit="cover" />
        </div>
      </div>
      <Paginate :paginate="dataList" class="page" @change="paginateChange" />
    </div>
    <Dialog :margin_top="-20" v-model:show="ifShowMaxImage" title="大图查看">
      <img class="maxImg" :src="maxImageUrl.url" alt="" />
    </Dialog>
  </Dialog>
</template>

<style scoped lang="scss">
.maxImg {
  width: 700px;
}
.WHImgSelect {
  width: 800px;
  > .list {
    display: grid;
    grid-template-columns: repeat(4, auto);
    margin-top: 10px;
    grid-row-gap: 5px;
    grid-column-gap: 5px;
    > .item {
      border-radius: 5px;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.2s;
      z-index: 1;
      position: relative;
      background-color: white;
      border: 1px solid #dddddd;
      > .state {
        display: none;
        position: absolute;
        top: 2px;
        left: 2px;
        width: 5px;
        height: 5px;
        background-color: #f6f6f6;
        border: 1px solid #dddddd;
        z-index: 3;
        border-radius: 50%;
      }
      > .con {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        z-index: 1;
        opacity: 0;
        transition: all 0.2s;
        > button {
          margin: 0 5px;
        }
      }
      > .img {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 0;
      }
      &.com {
        > .state {
          display: flex;
        }
      }
      &.on {
        transform: scale(1.12);
        box-shadow: 0 0px 30px 0 rgb(0 0 0 / 30%);
        z-index: 2;
        > .con {
          opacity: 1;
        }
      }
      &:hover {
        transform: scale(1.12);
        box-shadow: 0 0px 30px 0 rgb(0 0 0 / 30%);
        z-index: 2;
        > .con {
          opacity: 1;
        }
      }
    }
  }
  > .page {
    justify-content: center;
  }
}
</style>
