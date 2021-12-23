/**
 * 表单工具
 */
export class FormUtils {
    /** 
     * 获取验证规则的快捷方式
     */
    static getRules(_f: (value: any) => string | void | undefined, _op: any = {}) {
        return {
            required: true,
            validator: (rule: any, value: any) => {
                let _str = _f(value);
                if (_str) {
                    return Promise.reject(_str);
                } else {
                    return Promise.resolve();
                }
            },
            ..._op,
        };
    }
}