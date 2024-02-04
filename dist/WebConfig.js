"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
    Promise.resolve().then(() => __importStar(require('../.local/web.config'))).then((module) => {
        ObjectUtils_1.ObjectUtils.merge(WebConfig, module.default);
    });
}
catch (_a) {
    //
}
