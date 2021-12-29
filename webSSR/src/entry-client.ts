import { createApp, createSSRApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from './store';

//引入ui库
import ElementPlus from 'element-plus'
import "@/style/element.scss";
/** 注册svg组件 */
import svgIcon from '>/SvgIcon/index.vue'

//引入自定义样式
import "@/style/index.scss";

(async () => {
    /** 
     * vue实例
     * 这里不采用ssr的创建方式，改为完全覆盖ssr的内容
     * c端和s端完全分离
     */
    const app = createApp(App);

    app.component('svg-icon', svgIcon)
    app.use(ElementPlus);

    //引入vue全家桶
    app.use(await router);
    setupStore(app);

    //挂载
    app.mount('#app', true);
})();