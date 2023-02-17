"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfig = void 0;
const path_1 = __importDefault(require("path"));
const MainConfig_1 = require("./MainConfig");
const PathManager_1 = require("./PathManager");
/**
 * 后端配置
 */
class ServerConfig extends MainConfig_1.MainConfig {
}
exports.ServerConfig = ServerConfig;
/** 端口 */
ServerConfig.port = 6102;
/** 暗号相关 */
ServerConfig.secretCode = {
    /** 是否验证 */
    v: false,
    /** 过期时间 */
    overrunTime: 60 * 1000,
};
/** 公共文件缓存时间 */
ServerConfig.publicFileMaxAge = 1000 * 60 * 60 * 24 * 360;
/**
 * 阿里云相关配置
 * TODO 测试用的临时配置
 */
ServerConfig.aliOss = {
    region: "oss-cn-hangzhou",
    bucket: "test",
    access: {
        accessKeyId: "",
        accessKeySecret: "",
    },
    roleArn: '',
};
/** 关于orm的配置 */
ServerConfig.orm = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "test",
    entities: [
        path_1.default.join(PathManager_1.PathManager.server, "./dist/db/entities/**/*{.ts,.js}")
    ],
    synchronize: true
};
