import { createSSRApp } from 'vue';
import App from './App.vue';
import { renderToString } from '@vue/server-renderer';
import router from './router';
import { setupStore } from './store';
import { parseAsyncComData } from './erect/s/parseAsyncComData';
import { parseAsyncComHeadLabel } from './erect/s/parseAsyncComHeadLabel';

/** 
 * vue实例
 * 注意这里缓存了这个实例
 */
const app = createSSRApp(App);

//引入vue全家桶
app.use(router);
setupStore(app);

/**
 * 上下文
 */
const context = {};

/**
 * 渲染函数
 * @param url 
 * @param manifest 
 * @returns 
 */
export async function render(url: string, manifest: any) {
    //
    router.push(url);
    await router.isReady();//路由切换完毕
    //
    const to = router.currentRoute;
    //解析选项
    let parseOp = {
        route: to.value,
    };
    //解析当前路由中的异步数据
    await parseAsyncComData(to.value.matched?.map((item) => {
        return item.components.default as any;
    }), parseOp);
    //解析html头标签信息
    let headLable = await parseAsyncComHeadLabel(to.value.matched[0]?.components?.default as any, parseOp);
    //
    const appHtml = await renderToString(app, context);
    //返回模板
    return { appHtml, headLable };
}