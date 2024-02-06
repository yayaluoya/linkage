import { createApp } from './main';
import router from './router';
import { setupStore } from './store';
import ElementPlus, { ID_INJECTION_KEY } from 'element-plus';
// TODO 这里有个大坑，就是打包到node上会找不到这个模块，所以要加个.js的后缀
import zhCn from 'element-plus/dist/locale/zh-cn';

import '@/style/element.scss';

//引入自定义样式
import '@/style/index.scss';

const { app } = createApp();

//注入elment中的组件
app.use(ElementPlus, {
  locale: zhCn,
});
//TODO 暂时不知道这个有什么用
app.provide(ID_INJECTION_KEY, {
  prefix: 0,
  current: 0,
});

//引入vue全家桶
app.use(await router);
setupStore(app);

app.mount('#app');
