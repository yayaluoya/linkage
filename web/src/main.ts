import { createApp, createSSRApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from './store';
import '@/style/element.scss';

//引入自定义样式
import '@/style/index.scss';
import { handleApp } from './handleApp';

(async () => {
    const app = createApp(App);

    await handleApp(app);

    //引入vue全家桶
    app.use(await router);
    setupStore(app);

    app.mount('#app', true);
})();
