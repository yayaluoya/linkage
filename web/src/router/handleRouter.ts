import { Router } from 'vue-router';
import { EPage } from './EPage';

/**
 * 处理路由
 * @param router
 */
export function handleRouter(router: Router) {
    //添加解析守卫，主要解析路由中的meta
    router.beforeResolve(async (to) => {
        //
    });

    //添加前置守卫
    router.beforeEach((to, from, next) => {
        next();
    });

    //添加后置守卫
    router.afterEach((to, from) => {
        // ...
    });

    //路由异常守卫
    router.onError(() => {
        router.push({
            path: EPage.Null,
        });
    });
}
