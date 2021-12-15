/**
 * 对象工具
 */
export class ObjectUtils {
    /**
     * 清空一个对象的内容
     * @param obj 
     * @param _op 选项
     */
    static clearContent(obj: Record<string, any>, _op: {
        number?: number,
        boolean?: boolean,
        string?: string,
        array?: () => any[],
    } = {}) {
        //加入默认值
        _op = {
            number: 0,
            boolean: false,
            string: '',
            array: () => [],
            ..._op,
        };
        //
        for (let i in obj) {
            switch (true) {
                case typeof obj[i] == 'number':
                    obj[i] = _op.number;
                    break;
                case typeof obj[i] == 'boolean':
                    obj[i] = _op.boolean;
                    break;
                case typeof obj[i] == 'string':
                    obj[i] = _op.string;
                    break;
                case Array.isArray(obj[i]):
                    obj[i] = _op.array?.();
                    break;
            }
        }
    }
}