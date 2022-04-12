/**
 * 工具类命名空间
 */
declare namespace ToolN {
    /**
     * 数据con
     */
    interface DataCon<T = any> {
        [key: string]: any;
        /** 操作类型 */
        type: 'show' | 'edit' | 'add' | '';
        /** 数据类型 */
        data?: T;
    }
}