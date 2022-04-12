<script lang="ts">
import {
  ref,
  reactive,
  onMounted,
  onDeactivated,
  onUnmounted,
  computed,
} from "vue";
import { ComApiCon } from "@/http/apiCon/main/ComApiCon";
import { Mes } from "@/mes/Mes";
import { UserEvent } from "@/event/UserEvent";
import Se from ">/Se/Se.vue";
import { JSONPar } from "@/utils/JSONPar";
import { default as Color } from "color";

export default {
  components: { Se },
  props: {},
  setup(props, ctx) {
    const loading = ref(false);
    const userD = reactive<
      Partial<
        Omit<EN.IUserDataE, "themeData" | "socialData"> & {
          themeData: {
            head_portrait: string;
            background_picture: string;
            background_se: string[];
          };
          socialData: any[];
        }
      >
    >({
      name: "",
      state: "",
      introduction: "",
      themeData: {
        head_portrait: "",
        background_picture: "",
        background_se: [],
      },
      socialData: [],
      memoData: "",
    });
    const bcRef = ref<HTMLDivElement>();
    type bcType = {
      item: EN.IBulletCommentE;
      pos: {
        x: number;
        y: number;
      };
      speed: number;
      el?: HTMLDivElement;
      mouseover: boolean;
    };
    const bcList = ref<bcType[]>([]);

    /** 弹幕限制 */
    const getBcLimit = {
      ifGet: true,
      timeSpace: 0,
      onTime: 0,
    };
    function setTimeSpace() {
      getBcLimit.onTime = Date.now();
      getBcLimit.timeSpace = (Math.random() * 10 + 5) * 1000;
    }
    setTimeSpace();
    /** 随机获取一个弹幕 */
    function randomGetBC() {
      if (!getBcLimit.ifGet) {
        return;
      }
      requestAnimationFrame(() => {
        if (Date.now() - getBcLimit.onTime >= getBcLimit.timeSpace) {
          ComApiCon.instance
            .randomBC(
              bcList.value.map((item) => {
                return item.item.id;
              })
            )
            .then((item) => {
              if (!item) {
                setTimeSpace();
                //继续随机获取
                randomGetBC();
                return;
              }
              let index =
                bcList.value.push({
                  item,
                  pos: {
                    x: 0,
                    y: 0,
                  },
                  speed: Math.random() * 0.5 + 0.5,
                  mouseover: false,
                }) - 1;
              let onItem = bcList.value[index];
              setTimeout(() => {
                if (onItem.el) {
                  onItem.pos.y =
                    Math.random() *
                    (bcRef.value!.getBoundingClientRect().height -
                      onItem.el.getBoundingClientRect().height);
                  onItem.pos.x = bcRef.value!.getBoundingClientRect().width;
                }
                setTimeSpace();
                //继续随机获取
                randomGetBC();
              }, 0);
            })
            .catch(Mes.handleHttpCatch);
        } else {
          randomGetBC();
        }
      });
    }
    /** 更新bc的位置 */
    function updateBCPos() {
      if (!getBcLimit.ifGet) {
        return;
      }
      let removeItems: any[] = [];
      bcList.value.forEach((item) => {
        if (!item.mouseover && item.el) {
          if (item.pos.x + item.el!.getBoundingClientRect().width <= 0) {
            removeItems.push(item);
          } else {
            item.pos.x -= item.speed;
          }
        }
      });
      //剔除掉已经出界的bc
      bcList.value = bcList.value.filter((item) => {
        return !removeItems.includes(item);
      });
      //
      requestAnimationFrame(updateBCPos);
    }

    /** 获取数据 */
    function getData() {
      loading.value = true;
      ComApiCon.instance
        .getUser()
        .then((data) => {
          let userD_ = data.dataE!;
          userD.name = userD_.name;
          userD.state = userD_.state;
          userD.introduction = userD_.introduction;
          userD.themeData = JSONPar(userD_.themeData, {
            head_portrait: "",
            background_picture: "",
            background_se: [],
          });
          userD.themeData!.head_portrait = userD.themeData!.head_portrait || "";
          userD.themeData!.background_picture =
            userD.themeData!.background_picture || "";
          userD.themeData!.background_se = userD.themeData!.background_se || [];
          userD.socialData = JSONPar(userD_.socialData, []);
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loading.value = false;
        });
    }
    onMounted(() => {
      getData();
      randomGetBC();
      updateBCPos();
      //监听更新info事件，同步更新数据
      UserEvent.instance.on("updateInfo", null, getData);
    });
    onUnmounted(() => {
      getBcLimit.ifGet = false;
      //取消更新info事件的监听
      UserEvent.instance.off("updateInfo", null, getData);
    });

    return {
      loading,
      userD,
      bcList,
      Color,
      bcRef,
    };
  },
};
</script>

<template>
  <div class="userTop" v-loading="loading">
    <div class="background">
      <el-image
        :src="userD.themeData.background_picture"
        fit="cover"
      ></el-image>
      <Se
        v-for="(item, index) in userD.themeData.background_se"
        :key="index"
        :se="item"
      />
      <div class="bc" ref="bcRef">
        <div
          class="item"
          v-for="(item, index) in bcList"
          @mouseover="
            () => {
              item.mouseover = true;
            }
          "
          @mouseout="
            () => {
              item.mouseover = false;
            }
          "
          :ref="
            (el) => {
              item.el = el;
            }
          "
          :key="index"
          :style="{
            'background-color': item.item.color,
            '--color': Color(item.item.color).darken(0.7),
            left: item.pos.x + 'px',
            top: item.pos.y + 'px',
          }"
        >
          <span></span>
          <span>{{ item.item.content }}</span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <el-image :src="userD.themeData.head_portrait" fit="cover"></el-image>
      </div>
      <div class="right">
        <span class="stroke-text text-ellipsis name">{{ userD.name }}</span>
        <span class="state text-ellipsis">{{ userD.state }}</span>
        <span
          class="stroke-text introduction text-ellipsis-more text-ellipsis-5"
          >{{ userD.introduction }}</span
        >
        <div class="social" v-if="userD.socialData.length > 0">
          <a
            class="item"
            v-for="(item, index) in userD.socialData"
            :key="index"
            :href="item.href"
            target="_blank"
          >
            <img :src="item.icon" alt="" />
            {{ item.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.userTop {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 60px;
  position: relative;
  > .background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    // opacity: 0.1;
    z-index: 0;
    > .el-image {
      width: 100%;
      height: 100%;
    }
    > .bc {
      position: absolute;
      width: 100%;
      height: calc(100% - 40px);
      top: 5px;
      left: 0%;
      > .item {
        --color: var(--color);
        width: max-content;
        font-size: 14px;
        font-weight: bold;
        border-radius: 21px;
        background-color: white;
        padding: 5px;
        line-height: 14px;
        color: var(--color);
        // backdrop-filter: blur(10px);
        opacity: 0.7;
        position: absolute;
        display: flex;
        flex-direction: row;
        align-items: center;
        > span:nth-child(1),
        > span:nth-child(3) {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--color);
          opacity: 0.6;
        }
        > span:nth-child(1) {
          margin-right: 3px;
        }
        > span:nth-child(3) {
          margin-left: 3px;
        }
      }
    }
  }
  > .content {
    z-index: 1;
    width: var(--content-width);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    --left-width: 120px;
    --left-margin-right: 20px;
    pointer-events: none;
    > .left {
      width: var(--left-width);
      margin-right: var(--left-margin-right);
      pointer-events: all;
      > .el-image:deep() {
        width: var(--left-width);
        height: var(--left-width);
        border-radius: var(--border-radius);
        border: 3px solid white;
        background-color: white;
        box-sizing: border-box;
        box-shadow: 1px 1px 2px 0 rgb(0 0 0 / 12%);
        > img {
          border-radius: var(--border-radius);
        }
      }
    }
    > .right {
      width: calc(100% - var(--left-width) - var(--left-margin-right));
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      --margin-top: 10px;
      > .name,
      > .state,
      > .introduction,
      > .social > .item {
        pointer-events: all;
      }
      > .name {
        font-size: 22px;
        font-weight: bold;
      }
      > .state {
        font-size: 14px;
        background-color: rgb(255 255 255 / 50%);
        backdrop-filter: blur(10px);
        color: var(--color);
        border-radius: 15px;
        padding: 5px;
        line-height: 14px;
        font-weight: bold;
        margin-top: var(--margin-top);
      }
      > .introduction {
        font-size: 14px;
        margin-top: var(--margin-top);
      }
      > .social {
        margin-top: var(--margin-top);
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        > .item {
          font-size: 14px;
          background-color: rgb(255 255 255 / 20%);
          backdrop-filter: blur(10px);
          color: var(--color);
          border-radius: 20px;
          padding: 5px;
          line-height: 14px;
          font-weight: bold;
          margin-right: 5px;
          display: flex;
          flex-direction: row;
          align-items: center;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          &:hover {
            text-decoration: underline;
            color: #d2d3dc;
          }
          > img {
            width: 15px;
            height: 15px;
            margin-right: 3px;
          }
        }
        > .item:nth-last-child(1) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
