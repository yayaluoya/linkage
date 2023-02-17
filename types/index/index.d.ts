/**
 * 挑选类型部分key
 */
type typeCheckK<T, K extends keyof T> = K;

/**
 * 获取数组元素类型
 */
type getArrayItemType<T> = T extends Array<infer A> ? A : any;

/**
 * 数组化
 */
type arraifyType<T> = T | Array<T>;