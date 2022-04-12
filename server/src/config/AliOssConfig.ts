const config = require('../../config.json');

/**
 * 阿里云oss的配置
 */
export const AliOssConfig = {
    access: {
        accessKeyId: config.aliOss.access.accessKeyId,
        accessKeySecret: config.aliOss.access.accessKeySecret,
    },
};