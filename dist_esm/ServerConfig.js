import path from "path";
import { MainConfig } from "./MainConfig";
import { PathManager } from "./PathManager";
/**
 * 后端配置
 */
export class ServerConfig extends MainConfig {
}
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
        path.join(PathManager.server, "./dist/db/entities/**/*{.ts,.js}")
    ],
    synchronize: true
};
