import { WindowState } from "@/element/WindowState";
import { Router, RouteRecordRaw_ } from "vue-router";
import { EPage } from "./EPage";

/**
 * 添加额外的路由列表
 * @param _list 路由列表
 * @returns 
 */
export function addRouteList(_list: RouteRecordRaw_[]) {
    //加入默认路由
    _list.unshift({
        path: EPage.Root,
        redirect: EPage.Home,
    });
    //添加404路由
    _list.push({
        path: EPage.All,
        redirect: EPage.Null,
    });
    return _list;
}

/**
 * 处理路由
 * @param router 
 */
export function handleRouter(router: Router) {
    //添加解析守卫，主要解析路由中的meta
    router.beforeResolve(async to => {
        //
    })

    //添加前置守卫
    router.beforeEach((to, from, next) => {
        //路由切换后回到顶部
        WindowState.instance.elementTransform.scrollTo(0, 0, 0);
        //
        next();
    })

    //添加前置守卫
    router.afterEach((to, from) => {
        // ...
    })

    //路由异常守卫
    router.onError(() => {
        router.push({
            path: EPage.Null,
        });
    });
}