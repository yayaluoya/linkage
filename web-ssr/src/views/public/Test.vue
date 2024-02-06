<script lang="ts">
import { ref, reactive, onMounted } from 'vue';
import ColorPicker from '@/components/ColorPicker/ColorPicker.vue';
import { TestApiCon } from '@/http/apiCon/TestApiCon';
import { ArrayUtils } from 'yayaluoya-tool/dist/ArrayUtils';
import { HandleHttpData } from 'global-module/dist/HandleHttpData';
import { LoadingT } from 'yayaluoya-tool/dist/LoadingT';
import { Mes } from '@/mes/Mes';
import { TestDataProxy } from '@/localData/TestDataProxy';
import { TimeT } from '@/utils/TimeT';
import ImgSelect from '@/components/imgSelect/imgSelect.vue';

export default {
  components: { ColorPicker, ImgSelect },
  props: {},
  setup(props, ctx) {
    const color = ref('red');
    const loading = reactive(new LoadingT());
    let testDataList = ref<EN.ITestE[]>([]);
    const img = ref('');

    /** 发送测试请求 */
    function request() {
      loading.set(true, 'request');
      TestApiCon.instance
        .testPost({
          msg: '测试数据',
          list: ArrayUtils.fill(
            {
              a: 'a',
              b: 2,
            },
            2,
          ),
        })
        .then((data) => {
          console.log('测试请求', data);
        }, Mes.handleHttpCatch)
        .finally(() => {
          loading.set(false, 'request');
        });
    }

    /** 数据处理测试 */
    function dataHT() {
      let s = HandleHttpData.handle({ a: 10 }, ['e', 'z']);
      console.log(s);
      console.log(HandleHttpData.handle_(s, ['e', 'z']));
    }

    const testData = TestDataProxy.instance.data;

    function testDataChange() {
      testData.a++;
    }

    onMounted(() => {
      TestApiCon.instance.list().then(({ data: list }) => {
        testDataList.value = list;
      }, Mes.handleHttpCatch);
      //
      console.log('当前时间', TimeT.getOnTime());
    });

    const input = ref('');
    function addData() {
      if (!input.value) {
        Mes.error('必须输入内容');
        return;
      }
      loading.set(true, 'addData');
      TestApiCon.instance
        .add({
          number: Date.now(),
          string: input.value,
          isActive: false,
          cs: '测试内容',
          cs2: '测试内容2',
        })
        .then(({ data: item }) => {
          testDataList.value.push(item);
          input.value = '';
        }, Mes.handleHttpCatch)
        .finally(() => {
          loading.set(false, 'addData');
        });
    }

    return {
      img,
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
    <ImgSelect v-model:img="img" />
    <div>
      <ColorPicker v-model:color="color" />
    </div>
    <div>
      <el-button>哈哈哈</el-button>
      <el-button>哈哈哈</el-button>
    </div>
    <div>
      <el-button @click="request()" :loading="loading.get('request')"
        >发送测试请求{{ loading.get('request') }}</el-button
      >
      <el-button @click="dataHT()">数据处理测试</el-button>
      <el-button @click="testDataChange()">测试数据{{ testData.a }}</el-button>
    </div>
    <div class="list">
      <div>
        <el-input v-model="input" placeholder="请输入" clearable />
        <el-button @click="addData()" :loading="loading.get('addData')"
          >添加一个测试数据</el-button
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
