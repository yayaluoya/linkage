import { AliOssT as AliOssT_ } from "yayaluoya-tool/dist/node/AliYun/AliOssT";
import { CredentialsT as CredentialsT_ } from "yayaluoya-tool/dist/node/AliYun/CredentialsT";
import { instanceTool } from "yayaluoya-tool/dist/instanceTool";
import { AliOssConfig } from "config/AliOssConfig";
/**
 * 阿里云工具
 */
@instanceTool()
export class AliOssT extends AliOssT_ {
    static readonly instance: AliOssT;

    constructor() {
        super({
            accessKeyId: AliOssConfig.access.accessKeyId,
            accessKeySecret: AliOssConfig.access.accessKeySecret,
            bucket: AliOssConfig.bucket,
            region: AliOssConfig.region,
        });
    }

}

/**
 * 凭证工具
 */
@instanceTool()
export class CredentialsT extends CredentialsT_ {
    static readonly instance: CredentialsT;

    constructor() {
        super({
            accessKeyId: AliOssConfig.access.accessKeyId,
            accessKeySecret: AliOssConfig.access.accessKeySecret,
        });
    }

    /**
     * 获取临时凭证
     * @returns 
     */
    getSts() {
        return super.getSts(AliOssConfig.roleArn);
    }
}