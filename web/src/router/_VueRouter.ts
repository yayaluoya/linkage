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
     * 路由配置的导出类型
     */
    export type RouteRecordRawExport = Pick<Partial<RouteRecordRaw>, 'meta' | 'redirect' | 'beforeEnter'>;
}