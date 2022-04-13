import { AliOssConfig } from "@/config/AliOssConfig";
import { AdminApiCon } from "@/http/apiCon/main/AdminApiCon";
import OSS from "ali-oss";

/** 客户端 */
const clientP = AdminApiCon.instance.stsServer().then((info) => {
    return new OSS({
        accessKeyId: info.accessKeyId,
        accessKeySecret: info.accessKeySecret,
        stsToken: info.stsToken,
        refreshSTSToken: async () => {
            // 向您搭建的STS服务获取临时访问凭证。
            const info = await AdminApiCon.instance.stsServer();
            return {
                accessKeyId: info.accessKeyId,
                accessKeySecret: info.accessKeySecret,
                stsToken: info.stsToken,
            }
        },
        // 刷新临时访问凭证的时间间隔，单位为毫秒。
        refreshSTSTokenInterval: info.timeout,
        //地域
        region: AliOssConfig.region,
        //桶名
        bucket: AliOssConfig.bucket,
        //超时时间
        timeout: 60 * 1000,
    });
});

/**
 * 阿里云oss工具
 */
export class AliOssT {
    /**
     * 上次文件
     * @param file 目标文件
     * @param _url 文件地址
     * @returns 
     */
    static updateFile(file: File, _url: string): Promise<string> {
        return clientP.then((client) => {
            return client.put(_url, file, {
                //设置请求头
                headers: {
                    //设置一年的缓存
                    "Cache-Control": "max-age=31536000",
                },
            }).then(() => {
                return `//${AliOssConfig.bucket}.${AliOssConfig.region}.aliyuncs.com/${_url.replace(/^\/+/, '')}`;
            });
        });
    }
}