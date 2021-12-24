import { Env } from "@/_d/Env";
import { _RouteLocationBase } from "vue-router";
import { AsyncComOp } from "./AsyncComType";

/**
 * ssr选项工具
 */
export class SSROpT {
    /** 判断的唯一键值 */
    static readonly key = Symbol();

    /**
     * 注入ssr选项
     * 必须使用这个方法注入ssr选项，直接配置的选项是不予处理的
     * @param _op 
     * @returns 
     */
    static inject(_op: AsyncComOp) {
        //只在c端才有的的op
        let _cOp = {
            //路由进入的回调
            async beforeRouteEnter(to: _RouteLocationBase, from: _RouteLocationBase) {
                //
                let headLabel = await Promise.resolve(_op.asyncHeadLabel?.({
                    route: to,
                }) || {});
                for (let i in headLabel) {
                    let el = document.head.querySelector(i);
                    if (el) {
                        el.innerHTML = headLabel[i];
                    }
                }
            },
        };
        //
        return {
            //必须添加这个标识才会被受理
            [this.key]: true,
            ..._op,
            ...(Env.ifC ? _cOp : undefined),
        };
    }
}