/**
 * json转换
 */
export function JSONTransform<D>(data: D, _t: (s: string) => string): D {
    let str = JSON.stringify(data);
    return str ? JSON.parse(_t(str)) : data;
}
