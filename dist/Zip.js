"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gzip = void 0;
const pako_1 = require("pako");
/**
 * 压缩工具
 */
class Gzip {
    /**
     * gzip压缩
     * @param data
     */
    static gzip(data) {
        return (0, pako_1.gzip)(data, { to: 'string' });
    }
    /**
     * gzip解压
     * @param data
     */
    static ungzip(data) {
        return (0, pako_1.inflate)(data, {
            to: 'string'
        });
    }
}
exports.Gzip = Gzip;
