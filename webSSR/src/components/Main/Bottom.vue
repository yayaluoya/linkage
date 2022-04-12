<script lang="ts">
import { ref, reactive } from "vue";
import { headImg } from "@/const/headImg";
import { MainConfig } from "@/config/MainConfig";

export default {
  components: {},
  setup() {
    const ZHName = MainConfig.ZHName;
    const v = MainConfig.Version;
    return {
      headImg,
      ZHName,
      v,
    };
  },
};
</script>

<template>
  <div class="bottom">
    <div class="content">
      <div class="info">
        <span>
          <el-image
            class="img"
            :src="headImg"
            fit="cover"
            alt="yayaluoya-headPortrait"
            ref="head_portrait"
          ></el-image>
          {{ ZHName }}@{{ v }}😀😁😂
        </span>
        <span>记录了yayaluoya的程序员生活，始于2019年，终于。。。</span>
        <span class="git">
          <a
            href="https://github.com/yayaluoya/yayaluoya-blog-public"
            target="_blank"
          >
            <el-image
              class="img"
              src="https://github.githubassets.com/favicons/favicon.png"
              fit="cover"
              alt="github"
              style="filter: invert(1)"
            ></el-image>
            Github
          </a>
          <a
            href="https://gitee.com/yayaluoya/yayaluoya-blog-public"
            target="_blank"
          >
            <el-image
              class="img"
              src="https://assets.gitee.com/assets/favicon.ico"
              fit="cover"
              alt="gitee"
            ></el-image>
            Gitee
          </a>
        </span>
      </div>
      <div class="webs">
        <span>我的其他站点:</span>
        <div>
          <a href="https://www.zhansousou.com" target="_blank">站搜搜导航</a>
        </div>
      </div>
      <div class="linkExchange">
        <span>友情链接:</span>
        <div>
          <a href="https://www.dumogu.top/blog" target="_blank">毒蘑菇博客</a>
        </div>
      </div>
      <div class="statement">
        <span
          >本博客内容来自原创或网络，如有问题请联系站长及时删除。QQ：2414556387
          @期待。</span
        >
      </div>
    </div>
    <div class="webInfo">
      <a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备19040930号</a>
      <a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51010702001708"
        target="_blank"
      >
        川公网安备 51010702001708号
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottom {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #222231;
  padding-top: 20px;
  border-top: 2px solid var(--border-color);
  > .content {
    width: var(--content-width);
    color: white;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    opacity: 0.6;
    transition: all 0.4s;
    &:hover {
      opacity: 1;
    }
    > .info {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      > span:nth-child(1) {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        > .img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin-right: 5px;
          // border: 1px solid var(--border-color);
        }
      }
      > .git {
        margin-top: 5px;
        display: flex;
        flex-direction: row;
        > a {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-right: 10px;
          > .img {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            margin-right: 5px;
          }
        }
        > a:nth-last-child(1) {
          margin-right: 0;
        }
      }
    }
    > .webs,
    > .linkExchange {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
      > span {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      > div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        > a {
          margin-right: 5px;
        }
        > a:nth-last-child(1) {
          margin-right: 0;
        }
      }
    }
  }
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  > .webInfo {
    text-align: center;
    margin-top: 10px;
    padding-bottom: 10px;
    opacity: 0.6;
    > a {
      margin-right: 5px;
    }
    > a:nth-last-child(1) {
      margin-right: 0;
    }
  }
}
</style>
