"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebConfig = void 0;
const ObjectUtils_1 = require("yayaluoya-tool/dist/obj/ObjectUtils");
const MainConfig_1 = require("./MainConfig");
/**
 * 前端配置
 * TODO 此模块只能前端导入
 */
class WebConfig extends MainConfig_1.MainConfig {
}
exports.WebConfig = WebConfig;
/**
 * 阿里云相关配置
 * TODO 测试用的临时配置
 */
WebConfig.aliOss = {
    region: '',
    bucket: '',
};
try {
    ObjectUtils_1.ObjectUtils.merge(WebConfig, require('../.local/web.config'));
}
catch (_a) {
    //
}
