const config = require('../../config.json');

/**
 * 主配置
 */
export class MainConfig {
    /** 名字，最好只包含字母和数字 */
    static readonly Name = 'test';
    /** 中文名字 */
    static readonly ZHName = '测试';
    /** 版本 */
    static readonly Version = '1.0';
    /** 端口 */
    static readonly port = config.port;
    /** 是否验证前端暗号 */
    static readonly ifVSecretCode = true;
    /** 是否运行测试模块 */
    static readonly ifTest = true;
}