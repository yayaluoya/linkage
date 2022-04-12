const OSS = require("ali-oss");
// This file is auto-generated, don't edit it
import Sts20150401, * as $Sts20150401 from '@alicloud/sts20150401';
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import { AliOssConfig } from 'src/config/AliOssConfig';

export default class Client {
    /**
     * 使用AK&SK初始化账号Client
     * @return Client
     * @throws Exception
     */
    static createClient(): Sts20150401 {
        let config = new $OpenApi.Config({
            ...AliOssConfig.access,
        });
        // 访问的域名
        config.endpoint = `sts.cn-hangzhou.aliyuncs.com`;
        return new Sts20150401(config);
    }
    static main(op) {
        let client = Client.createClient();
        let assumeRoleRequest = new $Sts20150401.AssumeRoleRequest(op);
        //
        return client.assumeRole(assumeRoleRequest);
    }
}

/** 客户端 */
const client = new OSS({
    ...AliOssConfig.access,
    //地域
    region: 'oss-cn-beijing',
    //桶名
    bucket: '',
    //超时时间
    timeout: 60 * 1000,
});

/**
 * 阿里云oss工具
 */
export class AliOssT {
    /**
     * 获取临时凭证
     */
    static stsServer(): Promise<any> {
        return Client.main({
            roleArn: "",
            roleSessionName: "",
        }).then(({ body }) => {
            return {
                accessKeyId: body.credentials.accessKeyId,
                accessKeySecret: body.credentials.accessKeySecret,
                stsToken: body.credentials.securityToken,
                timeout: 300 * 1000,
            };
        });
    }

    /**
     * 上次文件
     * @param file 目标文件
     * @param _url 文件地址
     * @returns 
     */
    static updateFile(file: Buffer, _url: string): Promise<string> {
        //设置请求头
        const headers = {
            //设置一年的缓存
            "Cache-Control": "max-age=31536000",
        };
        return client.put(_url, file, headers).then(() => {
            return `//yayaluoya-blog.oss-cn-beijing.aliyuncs.com/${_url.replace(/^\/+/, '')}`;
        });
    }
}