import { WindowState } from "@/element/WindowState";
import { Router } from "vue-router";
import { RouterTool } from "./RouterTool";

/**
 * 处理路由
 * @param router 
 */
export function handleRouter(router: Router) {
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
}