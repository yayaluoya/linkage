import { message } from "ant-design-vue";
import { Router } from "vue-router";
import { EPage, IRouterMata } from ".";

/**
 * 处理路由
 * @param router 
 */
export function handleRouter(router: Router) {
    //添加前置守卫
    router.beforeEach((to, from, next) => {
        //
        next();
    })

    //添加前置守卫
    router.afterEach((to, from) => {
        // ...
    })
}