const config = require('../../config/config');

/**
 * 阿里云oss的配置
 */
export const AliOssConfig = {
    /** 地域 */
    region: config.aliOss.region,
    /** 桶名 */
    bucket: config.aliOss.bucket,
    /** 用户信息 */
    access: {
        accessKeyId: config.aliOss.access.accessKeyId,
        accessKeySecret: config.aliOss.access.accessKeySecret,
    },
};