const config = require('../../config/config');
import { MainConfig as MainConfig_ } from "@utils/MainConfig";

/**
 * 主配置
 */
export class MainConfig extends MainConfig_ {
    /** 端口 */
    static readonly port = config.port;
    /** 是否验证前端暗号 */
    static readonly ifVSecretCode = config.ifVSecretCode;
    /** 是否运行测试模块 */
    static readonly ifTest = config.ifTest;
}