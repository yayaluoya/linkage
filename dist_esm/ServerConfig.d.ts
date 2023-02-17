import { MainConfig } from "./MainConfig";
/**
 * 后端配置
 */
export declare class ServerConfig extends MainConfig {
    /** 端口 */
    static port: number;
    /** 暗号相关 */
    static secretCode: {
        /** 是否验证 */
        v: boolean;
        /** 过期时间 */
        overrunTime: number;
    };
    /** 公共文件缓存时间 */
    static publicFileMaxAge: number;
    /**
     * 阿里云相关配置
     * TODO 测试用的临时配置
     */
    static aliOss: {
        region: string;
        bucket: string;
        access: {
            accessKeyId: string;
            accessKeySecret: string;
        };
        roleArn: string;
    };
    /** 关于orm的配置 */
    static orm: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        entities: string[];
        synchronize: boolean;
    };
}
//# sourceMappingURL=ServerConfig.d.ts.map