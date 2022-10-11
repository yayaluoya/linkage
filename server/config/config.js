module.exports = {
    /** 端口 */
    port: 6102,
    /** 是否验证暗号 */
    ifVSecretCode: true,
    /** 阿里云相关配置 */
    aliOss: {
        region: "",
        bucket: "",
        access: {
            accessKeyId: "",
            accessKeySecret: "",
        }
    },
    /** 是否运行测试模块 */
    ifTest: true,
}