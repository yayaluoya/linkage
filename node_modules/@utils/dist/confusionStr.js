"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confusionStr = void 0;
const CryptoI_1 = require("./CryptoI");
/**
 * 混淆字符串
 * @param _str
 * @returns
 */
function confusionStr(_str, _ifMd5 = true) {
    if (typeof _str !== 'string' || !_str) {
        return '';
    }
    let newStr = '';
    for (let i = 0; i < _str.length; i++) {
        newStr += String.fromCharCode(_str.charCodeAt(i) + i);
    }
    if (_ifMd5) {
        //这里不能直接用封装的加密工具，因为会有循环依赖的问题
        newStr = CryptoI_1.CryptoI.md5(_str);
    }
    return newStr;
}
exports.confusionStr = confusionStr;
