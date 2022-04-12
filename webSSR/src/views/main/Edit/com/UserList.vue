<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import { AdminApiCon } from "@/http/apiCon/main/AdminApiCon";
import { Mes } from "@/mes/Mes";
import Dialog from ">/Dialog/Dialog.vue";
import { ElForm } from "element-plus";
import { FormItemRule } from "element-plus/es/components/form/src/form.type";
import { ComVerify } from "com_utils/ComVerify";
export default {
  components: { Dialog },
  props: {},
  setup(props, ctx) {
    const loadLoading = ref(false);
    const showAddDialog = ref(false);
    const addLoading = ref(false);
    const tableData = ref<EN.IUserE[]>([]);
    const editDelStateLoading = ref<number[]>([]);
    const model = reactive<
      Partial<
        EN.IUserE & {
          name: string;
        }
      >
    >({
      account: "",
      password: "",
      name: "",
    });
    const formRef = ref<InstanceType<typeof ElForm>>();
    const formRules: Record<"account" | "password" | "name", FormItemRule> = {
      account: {
        required: true,
        validator: (rule, value, callback) => {
          callback(ComVerify.UserV.account(value) || undefined);
        },
      },
      password: {
        required: true,
        validator: (rule, value, callback) => {
          callback(ComVerify.UserV.password(value) || undefined);
        },
      },
      name: {
        required: true,
        validator: (rule, value, callback) => {
          callback(ComVerify.UserV.name_(value) || undefined);
        },
      },
    };

    /** 加载数据 */
    function loadData() {
      loadLoading.value = true;
      AdminApiCon.instance
        .getUserList()
        .then((list) => {
          tableData.value = list;
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          loadLoading.value = false;
        });
    }

    /** 添加 */
    function add() {
      showAddDialog.value = true;
    }

    /** 添加用户 */
    function addUser() {
      if (addLoading.value) {
        return;
      }
      addLoading.value = true;
      formRef.value
        ?.validate()
        ?.then(() => {
          AdminApiCon.instance
            .addUser({
              ...model,
            })
            .then((user) => {
              tableData.value.push(user);
              Mes.success("添加成功");
              showAddDialog.value = false;
              //
              model.account = "";
              model.password = "";
              model.name = "";
            })
            .catch(Mes.handleHttpCatch)
            .finally(() => {
              addLoading.value = false;
            });
        })
        .catch(Mes.handleFormCatch);
    }

    /** 编辑删除状态 */
    function editDelState(id: number) {
      editDelStateLoading.value.push(id);
      let user = tableData.value.find((item) => {
        return item.id == id;
      })!;
      AdminApiCon.instance
        .setUserDeleteState({
          userId: user.id,
          delState: !user.delete,
        })
        .then(() => {
          Mes.success("设置成功");
          user.delete = !user.delete;
        })
        .catch(Mes.handleHttpCatch)
        .finally(() => {
          editDelStateLoading.value = editDelStateLoading.value.filter((_) => {
            return _ != user.id;
          });
        });
    }

    onMounted(() => {
      loadData();
    });

    return {
      loadLoading,
      showAddDialog,
      tableData,
      add,
      addUser,
      model,
      formRef,
      formRules,
      addLoading,
      editDelState,
      editDelStateLoading,
    };
  },
};
</script>

<template>
  <div class="userList">
    <el-table :data="tableData" style="width: 100%" v-loading="loadLoading">
      <el-table-column prop="account" label="账户" />
      <el-table-column label="名字">
        <template #default="{ row }">
          <span>{{ row.dataE.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="删除状态">
        <template #default="{ row }">
          <el-switch
            :value="row.delete"
            :loading="editDelStateLoading.includes(row.id)"
            @change="editDelState(row.id)"
          />
        </template>
      </el-table-column>
    </el-table>
    <my-button @click="add" type="e">添加</my-button>
    <Dialog v-model:show="showAddDialog">
      <div class="add">
        <el-form
          :model="model"
          ref="formRef"
          :rules="formRules"
          label-width="80px"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="model.account" placeholder="请输入用户账号" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="model.password" placeholder="请输入用户密码" />
          </el-form-item>
          <el-form-item label="名字" prop="name">
            <el-input v-model="model.name" placeholder="请输入用户名字" />
          </el-form-item>
        </el-form>
      </div>
      <template #bottom>
        <my-button :loading="addLoading" type="e" @click="addUser"
          >添加</my-button
        >
      </template>
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.userList {
  > button {
    margin-top: 20px;
    width: 100%;
  }
}
.add {
  width: 500px;
}
</style>