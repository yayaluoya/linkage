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
        return {
            //必须添加这个标识才会被受理
            [this.key]: true,
            ..._op,
        };
    }
}