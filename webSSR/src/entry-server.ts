import { App, createSSRApp } from 'vue';
import App_ from './App.vue';
import { renderToString } from '@vue/server-renderer';
import router from './router';
import { setupStore } from './store';
import { parseAsyncComData } from './erect/s/parseAsyncComData';
import { parseAsyncComHeadLabel } from './erect/s/parseAsyncComHeadLabel';
import { handleApp } from './handleApp';

/** 获取app的promise */
let _appPromise = new Promise<{
    /** vue实例 */
    app: App<Element>;
    /** 上下文 */
    context: any;
}>(async (r) => {
    /** 
     * vue实例
     * 注意这里缓存了这个实例
     */
    const app = createSSRApp(App_);

    await handleApp(app);

    //引入vue全家桶
    app.use(await router);
    setupStore(app);

    /**
     * 上下文
     */
    const context = {};

    r({
        app,
        context,
    });
});

/**
 * 渲染函数
 * @param url 
 * @param manifest 
 * @returns 
 */
export async function render(url: string, manifest: any) {
    //获取app实例
    let { app, context } = await _appPromise;
    //获取router实例
    let _router = await router;
    /**
     * 路由切换
     * TODO 这里有个超级大bug，就是这个方法是个异步的
     */
    await _router.push({
        path: url,
    });
    await _router.isReady();//路由切换完毕
    //
    const to = _router.currentRoute;
    // console.log('后端路由切换', url, to.value.path);
    //解析选项，这个选项是可以被动态加属性的，可以把一些公告的东西做复用
    let parseOp = {
        route: to.value,
        url,
    };
    //解析当前路由中的异步数据
    await parseAsyncComData(to.value.matched?.map((item) => {
        return item.components.default as any;
    }), parseOp);
    //解析html头标签信息，获取路由链中的所有组件的heard组合
    let headLable = {};
    for (let o of to.value.matched) {
        headLable = {
            ...headLable,
            ... await parseAsyncComHeadLabel(o?.components?.default as any, parseOp),
        };
    }

    //
    const appHtml = await renderToString(app, context);
    //返回模板
    return { appHtml, headLable };
}