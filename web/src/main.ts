import { createApp, createSSRApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from './store';
import "@/style/element.scss";

//引入自定义样式
import "@/style/index.scss";
import { handleApp } from './handleApp';
import { vUser } from './vUser';

(async () => {
    /** 
     * vue实例
     * 这里不采用ssr的创建方式，改为完全覆盖ssr的内容
     * c端和s端完全分离
     */
    const app = createApp(App);

    await handleApp(app);

    //引入vue全家桶
    app.use(await router);
    setupStore(app);

    app.mount('#app', true);
})();

vUser();