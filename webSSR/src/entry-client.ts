import { createApp, createSSRApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from './store';

//引入antd ui库
import Antd from 'ant-design-vue';
import "@/style/antd.less";

//引入自定义样式
import "@/style/index.scss";

/** 
 * vue实例
 * 这里不采用ssr的创建方式，改为完全覆盖ssr的内容
 * c端和s端完全分离
 */
const app = createApp(App);

//引入vue全家桶
app.use(router);
setupStore(app);
app.use(Antd);

//挂载
app.mount('#app', true);