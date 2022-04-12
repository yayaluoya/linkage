<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import { GitApiCon } from "@/http/apiCon/main/GitApiCon";
import { Mes } from "@/mes/Mes";
import UserInfo from "./UserInfo.vue";
import List from "./List.vue";
export default {
  components: { UserInfo, List },
  setup(props, ctx) {
    const loadingInfo = ref(false);
    const userInfo = ref<Partial<GitN.Gitee.IUserInfo>>({});
    onMounted(() => {
      loadingInfo.value = true;
      GitApiCon.instance
        .getGithubUserInfo()
        .then((info) => {
          userInfo.value = info;
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loadingInfo.value = false;
        });
    });
    /** 加载列表 */
    function loadList(_op: any) {
      return GitApiCon.instance.getGithubPublicRepos(_op).then((data) => {
        //对data进行处理
        return data;
      });
    }
    return {
      loadingInfo,
      userInfo,
      loadList,
    };
  },
};
</script>

<template>
  <div class="github">
    <UserInfo :userInfo="userInfo" :loading="loadingInfo" />
    <List :loadList="loadList" />
  </div>
</template>

<style scoped lang="scss">
.github {
}
</style>
