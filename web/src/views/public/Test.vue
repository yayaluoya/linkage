<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import ColorPicker from ">/ColorPicker/ColorPicker.vue";
import { TestApiCon } from "@/http/apiCon/TestApiCon";
import { ArrayUtils } from "yayaluoya-tool/dist/ArrayUtils";
import { HandleHttpData } from "com_utils/dist/handleHttpData";
import { LoadingT } from "yayaluoya-tool/dist/LoadingT";
import { Mes } from "@/mes/Mes";
import { TestDataProxy } from "@/localData/TestDataProxy";
import { TimeT } from "@/utils/TimeT";
export default {
  components: { ColorPicker },
  props: {},
  setup(props, ctx) {
    const color = ref("red");
    const loading = reactive(new LoadingT());
    let testDataList = ref<EN.ITestE[]>([]);

    /** 发送测试请求 */
    function request() {
      loading.set(true, "request");
      TestApiCon.instance
        .testPost({
          msg: "测试数据",
          list: ArrayUtils.fill(
            {
              a: "a",
              b: 2,
            },
            2
          ),
        })
        .then((data) => {
          console.log("测试请求", data);
        }, Mes.handleHttpCatch)
        .finally(() => {
          loading.set(false, "request");
        });
    }

    /** 数据处理测试 */
    function dataHT() {
      let s = HandleHttpData.handle({ a: 10 }, ["e", "z"]);
      console.log(s);
      console.log(HandleHttpData.handle_(s, ["e", "z"]));
    }

    const testData = TestDataProxy.instance.data;

    function testDataChange() {
      testData.a++;
    }

    onMounted(() => {
      TestApiCon.instance.list().then((list) => {
        testDataList.value = list;
      }, Mes.handleHttpCatch);
      //
      console.log("当前时间", TimeT.getOnTime());
    });

    const input = ref("");
    function addData() {
      if (!input.value) {
        Mes.error("必须输入内容");
        return;
      }
      loading.set(true, "addData");
      TestApiCon.instance
        .add({
          number: Date.now(),
          string: input.value,
        })
        .then((item) => {
          testDataList.value.push(item);
          input.value = "";
        }, Mes.handleHttpCatch)
        .finally(() => {
          loading.set(false, "addData");
        });
    }

    return {
      color,
      request,
      dataHT,
      loading,
      testData,
      testDataChange,
      testDataList,
      addData,
      input,
    };
  },
};
</script>

<template>
  <div class="test">
    <span>测试页面</span>
    <div>
      <ColorPicker v-model:color="color" />
    </div>
    <div>
      <my-button>哈哈哈</my-button>
      <my-button type="e">哈哈哈</my-button>
    </div>
    <div>
      <my-button @click="request()" :loading="loading.get('request')"
        >发送测试请求{{ loading.get("request") }}</my-button
      >
      <my-button @click="dataHT()">数据处理测试</my-button>
      <my-button @click="testDataChange()">测试数据{{ testData.a }}</my-button>
    </div>
    <div class="list">
      <div>
        <el-input v-model="input" placeholder="请输入" clearable />
        <my-button @click="addData()" :loading="loading.get('addData')"
          >添加一个测试数据</my-button
        >
      </div>
      <div class="item" v-for="(item, index) in testDataList" :key="index">
        {{ item.id }}-{{ item.string }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.test {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin-bottom: 20px;
  }
  > .list {
    > div:nth-child(1) {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    > .item {
      margin-bottom: 10px;
      font-size: 20px;
    }
  }
}
</style>