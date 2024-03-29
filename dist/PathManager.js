"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathManager = void 0;
const path_1 = __importDefault(require("path"));
/**
 * 路径管理器
 */
class PathManager {
    /** 获取项目根路径 */
    static get rootPath() {
        return path_1.default.join(__dirname, '../');
    }
    /** 服务端路径 */
    static get server() {
        return path_1.default.join(this.rootPath, './server');
    }
    /** web端项目路径 */
    static get web() {
        return path_1.default.join(this.rootPath, './web');
    }
}
exports.PathManager = PathManager;
