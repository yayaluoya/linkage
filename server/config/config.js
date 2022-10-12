module.exports = {
    /** 端口 */
    port: 6102,
    /** 暗号相关 */
    secretCode: {
        /** 是否验证 */
        v: false,
        /** 过期时间 */
        overrunTime: 60 * 1000,
    },
    /** 
     * 阿里云相关配置
     * TODO 测试用的临时配置
     */
    aliOss: {
        region: "oss-cn-hangzhou",
        bucket: "yayaluoya-test",
        access: {
            accessKeyId: "LTAI5tJmDzkUiD911YUVDjMa",
            accessKeySecret: "MtdSYoxiHEaioWff2M9v4KafU5XBj4",
        },
        roleArn: 'acs:ram::1330807560356268:role/yayaluoya-test',
    },
    /** 是否运行测试模块 */
    ifTest: true,
}