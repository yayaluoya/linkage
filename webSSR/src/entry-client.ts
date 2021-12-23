import { createSSRApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from './store';

/** vue实例 */
const app = createSSRApp(App);

//引入vue全家桶
app.use(router);
setupStore(app);

app.mount('#app', true);