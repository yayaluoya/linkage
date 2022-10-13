import { AliOssConfig } from "@/config/AliOssConfig";
import { ComApiCon } from "@/http/apiCon/ComApiCon";
import { AliOSST } from "yayaluoya-tool/dist/web/AliYun/AliOSST";
import { instanceTool } from "yayaluoya-tool/dist/instanceTool"

/**
 * 阿里云oss工具
 */
@instanceTool()
export class AliOssT extends AliOSST {
    /** 单例 */
    static instance: AliOssT;

    constructor() {
        super({
            accessKeyId: '',
            accessKeySecret: '',
            stsToken: '',
            refreshSTSToken: async () => {
                // 向您搭建的STS服务获取临时访问凭证。
                const info = await ComApiCon.instance.getSts();
                return {
                    accessKeyId: info.AccessKeyId,
                    accessKeySecret: info.AccessKeySecret,
                    stsToken: info.SecurityToken,
                }
            },
            //地域
            region: AliOssConfig.region,
            //桶名
            bucket: AliOssConfig.bucket,
            //超时时间
            timeout: 60 * 1000,
        })
    }
}