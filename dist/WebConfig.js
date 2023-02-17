"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebConfig = void 0;
const MainConfig_1 = require("./MainConfig");
/**
 * 前端配置
 */
class WebConfig extends MainConfig_1.MainConfig {
}
exports.WebConfig = WebConfig;
/**
 * 阿里云相关配置
 * TODO 测试用的临时配置
 */
WebConfig.aliOss = {
    region: "",
    bucket: "",
};
