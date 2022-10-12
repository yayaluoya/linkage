/**
 * 整理url
 * @param _s 
 * @returns 
 */
export function finishingUrl(_s: string): string {
    //主要是对window平台的路径分隔符进行替换
    return _s.replace(/\\+/g, '/');
}