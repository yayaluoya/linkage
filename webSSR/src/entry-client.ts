import { createApp, createSSRApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from './store';

/** 
 * vue实例
 * 这里不采用ssr的创建方式，改为完全覆盖ssr的内容
 * c端和s端完全分离
 */
const app = createApp(App);

//引入vue全家桶
app.use(router);
setupStore(app);

//挂载
app.mount('#app', true);