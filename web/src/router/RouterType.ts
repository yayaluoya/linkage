import { RouteRecordRaw } from "vue-router";

/**
 * 路由mata数据类型
 */
export interface IRouterMata {
    /** 权限列表 */
    v: string[];
    /** 是否显示到路由列表中 */
    ifShow: boolean;
    /** 导航名字 */
    navName: string;
}

/** 自定义router生成器 */
type CustomizeRouterType_<T> = {
    [key in keyof T]: T[key];
} & {
    /** meta */
    meta?: IRouterMata;
    /** 异步获取meta */
    metaP?: Promise<IRouterMata>;
};

/**
 * 自定义类型
 */
export type CustomizeRouterType = CustomizeRouterType_<RouteRecordRaw>;
