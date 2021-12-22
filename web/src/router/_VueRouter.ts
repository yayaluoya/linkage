import 'vue-router'

/**
 * 对vue-router的扩展
 */
declare module 'vue-router' {
    /**
     * 路由meta类型
     */
    export interface RouteMeta {
        /** 权限列表 */
        v: string[];
        /** 是否显示到路由列表中 */
        ifShow: boolean;
        /** 导航名字 */
        navName: string;
    }

    /**
     * RouteRecordRaw的扩展类型
     */
    type RouteRecordRaw_ = RouteRecordRaw & {
        /** 解决为meta的promise */
        metaP?: Promise<RouteMeta>;
    };
}
