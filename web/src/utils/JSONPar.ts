/**
 * json解析
 * @param str 
 */
export function JSONPar<T = any>(str: any, def?: any): T {
    try {
        return JSON.parse(str);
    } catch {
        return def;
    }
}