<script lang="ts">
import { ref, reactive, computed } from "vue";
import { Lock, User, Avatar } from "@element-plus/icons-vue";
import Password from "./com/Password.vue";
import User_ from "./com/User.vue";
import UserList from "./com/UserList.vue";
import { UserDataProxy } from "@/localData/dataItem/UserDataProxy";
import { useRouter } from "vue-router";
import { EPage } from "@/router/EPage";
import { AdminApiCon } from "@/http/apiCon/main/AdminApiCon";
import { Mes } from "@/mes/Mes";
import { UserConfig } from "@/config/UserConfig";
import { SSROpT } from "@/erect/SSROpT";
export default {
  ...SSROpT.inject({
    asyncHeadLabel() {
      return {
        title: "设置",
      };
    },
  }),
  components: {},
  setup(props, ctx) {
    const router = useRouter();
    const tabs: any[] = [
      {
        com: User_,
        icon: User,
        name: "账号信息",
      },
      {
        com: Password,
        icon: Lock,
        name: "修改密码",
      },
    ];
    //必须是根用户才能有编辑用户列表的功能
    if (UserDataProxy.instance.data.id == UserConfig.rootUserId) {
      tabs.push({
        com: UserList,
        icon: Avatar,
        name: "用户列表",
      });
    }
    const onTabIndex = ref(0);
    const component = computed(() => {
      return tabs[onTabIndex.value].com;
    });
    const outLoginLoading = ref(false);

    /** 退出登录 */
    function outLogin() {
      if (outLoginLoading.value) {
        return;
      }
      outLoginLoading.value = true;
      AdminApiCon.instance
        .outLogin()
        .then(() => {
          UserDataProxy.instance.resetData();
          router.push({
            path: EPage.Home,
          });
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          outLoginLoading.value = false;
        });
    }

    return {
      tabs,
      onTabIndex,
      component,
      outLogin,
      outLoginLoading,
    };
  },
};
</script>

<template>
  <div class="edit">
    <div class="left box-shadow">
      <div
        class="item"
        v-for="(item, index) in tabs"
        :key="index"
        :class="{
          on: onTabIndex == index,
        }"
        @click="onTabIndex = index"
      >
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </div>
      <div class="item outLogin">
        <span @click="outLogin" v-loading="outLoginLoading">退出登录</span>
      </div>
    </div>
    <div class="right box-shadow">
      <keep-alive>
        <component :is="component"></component>
      </keep-alive>
    </div>
  </div>
</template>

<style scoped lang="scss">
.edit {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  --left-width: 200px;
  --left-margin-right: 20px;
  > .left {
    width: calc(var(--left-width) - var(--padding) * 2);
    margin-right: var(--left-margin-right);
    padding: var(--padding);
    border-radius: var(--border-radius);
    background-color: white;
    display: flex;
    flex-direction: column;
    > .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s;
      padding: 10px;
      border-radius: var(--border-radius);
      > .el-icon {
        font-size: 18px;
        margin-right: 5px;
      }
      > span {
        font-size: 16px;
        color: var(--color);
        font-weight: bold;
      }
      &:hover {
        background-color: var(--background-color);
      }
      &.on {
        > span {
          color: #0084ff;
        }
      }
    }
    > .item:nth-last-child(1) {
      margin-bottom: 0;
    }
    > .outLogin {
      > span {
        color: #f56c6c;
      }
    }
  }
  > .right {
    width: calc(
      100% - var(--left-width) - var(--left-margin-right) - var(--padding) * 2
    );
    padding: var(--padding);
    border-radius: var(--border-radius);
    background-color: white;
  }
}
</style>
