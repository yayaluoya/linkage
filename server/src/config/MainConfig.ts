const config = require('../../config/config');
import { MainConfig as MainConfig_ } from "@utils/MainConfig";

/**
 * 主配置
 */
export class MainConfig extends MainConfig_ {
    /** 端口 */
    static readonly port = config.port;

    /** 暗号相关 */
    static readonly secretCode: {
        /** 是否验证 */
        v: boolean;
        /** 过期时间 */
        overrunTime: number;
    } = config.secretCode;

    /** 是否运行测试模块 */
    static readonly ifTest = config.ifTest;
}