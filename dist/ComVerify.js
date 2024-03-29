"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComVerify = void 0;
const is_color_1 = __importDefault(require("is-color"));
const is_1 = require("yayaluoya-tool/dist/is");
/**
 * 公共验证
 */
class ComVerify {
    /**
     * 颜色验证
     * @param _str
     * @param _title
     * @returns
     */
    static colorV(_str, _title) {
        return (0, is_color_1.default)(_str) ? '' : `${_title}必须是正确的颜色值`;
    }
    /**
     * 长度验证
     * @param _str
     * @param _g
     * @param _title
     */
    static lengthV(_str, _g, _title) {
        if (_str.length < _g[0]) {
            if (_g[0] == 1) {
                return `${_title}不能为空`;
            }
            return `${_title}长度不能少于${_g[0]}个字符`;
        }
        if (_str.length > _g[1]) {
            return `${_title}长度不能超过${_g[1]}个字符`;
        }
        return '';
    }
    /**
     *
     * @param _str 路径验证
     */
    static urlV(_str) {
        if ((0, is_1.isUrl)(_str)) {
            return '';
        }
        return '路径格式有误';
    }
}
exports.ComVerify = ComVerify;
