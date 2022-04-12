import { ComponentOptionsMixin } from "vue";
import { _RouteLocationBase } from "vue-router";

/**
 * 解析异步组件选项
 */
export interface parseAsyncComOp<T = any> {
    /** 其它注入数据 */
    com?: T;
    /** 路由信息 */
    route: _RouteLocationBase;
    /** 真实url */
    url: string;
}

/**
 * 异步组件选项
 */
export type AsyncComOp = {
    /**
     * 异步获取数据
     * 返回的数据将会合并到setup返回的数据中
     * 只有后端会处理，前端自行处理
     * @param _op 选项
     */
    asyncData?(_op: parseAsyncComOp): Promise<Record<string, any>> | Record<string, any>;
    /** setup的缓存，必须缓存一个原始setup方法，不然会出现无限嵌套的情况 */
    setup__asyncData?: Function;

    /**
     * 异步头标签数据
     * 注意只有在第一个组件上配置才有用，也就是说只有在页面组件上配置才有用
     * 前后端都会做处理
     * @param _op 选项
     */
    asyncHeadLabel?(_op: parseAsyncComOp): Promise<Record<string, string>> | Record<'title' | string, string>;
};

/** 
 * 异步组件类型
 */
export type AsyncComType = ComponentOptionsMixin & AsyncComOp;