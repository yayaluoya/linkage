import { UserDataProxy } from "@/localData/UserDataProxy";
import { Router, RouteRecordRaw } from "vue-router";
import { EPage } from "./EPage";

/**
 * 过滤路由
 * @param _string 
 * @returns 
 */
export function filterRoute(_string: string): boolean {
    //过滤掉组件文件夹下的组件
    if (/\/com(ponents?)?\//i.test(_string)) {
        return false;
    }
    return true;
}

/**
 * 添加额外的路由列表
 * @param _list 路由列表
 * @returns 
 */
export function addRouteList(_list: RouteRecordRaw[]) {
    //加入默认路由
    _list.unshift(...[
        {
            path: EPage.Root,
            redirect: EPage.Home,
        },
        {
            path: EPage.index,
            redirect: EPage.Home,
        },
    ]);
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
        //登录了的话
        if (UserDataProxy.instance.ifLogin) {
            //不能去登录页面
            if (to.path == EPage.login) {
                next(from);
                return;
            }
        }
        //
        next();
    })

    //添加后置守卫
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