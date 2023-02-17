import { CryptoI } from "./CryptoI";
/**
 * 混淆字符串
 * @param _str 
 * @returns 
 */
export function confusionStr(_str: string, _ifMd5 = true): string {
    if (typeof _str !== 'string' || !_str) {
        return '';
    }
    let newStr = '';
    for (let i = 0; i < _str.length; i++) {
        newStr += String.fromCharCode(_str.charCodeAt(i) + i);
    }
    if (_ifMd5) {
        //这里不能直接用封装的加密工具，因为会有循环依赖的问题
        newStr = CryptoI.md5(_str);
    }
    return newStr;
}