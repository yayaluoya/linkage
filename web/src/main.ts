import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupStore } from './store';
import svgIcon from '>/SvgIcon/index.vue'

//引入ui库
import ElementPlus from 'element-plus'
import "@/style/element.scss";

//引入自定义样式
import "@/style/index.scss";

//引入md编辑器
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
(async () => {
    VueMarkdownEditor.use(vuepressTheme, {
        Prism,
    });

    let app = createApp(App)

    /** 注册svg组件 */
    app.component('svg-icon', svgIcon)
    app.use(ElementPlus);
    app.use(VueMarkdownEditor);
    //
    app.use(await router);
    setupStore(app);
    //
    app.mount('#app')
})();
