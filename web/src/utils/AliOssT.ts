import { AliOssConfig } from '@/config/AliOssConfig';
import { AliOSST as AliOSST_ } from 'yayaluoya-tool/dist/web/AliYun/AliOSST';
import { ComApiCon } from '@/http/apiCon/ComApiCon';
import OSS from 'ali-oss';

/**
 * 阿里云oss工具
 */
export class AliOssT extends AliOSST_ {
  /** 单例 */
  static instance = ComApiCon.instance.getSts().then((info) => {
    return new AliOssT(info.data);
  });

  constructor(info: OSS.Credentials) {
    super({
      accessKeyId: info.AccessKeyId,
      accessKeySecret: info.AccessKeySecret,
      stsToken: info.SecurityToken,
      refreshSTSToken: async () => {
        // 向您搭建的STS服务获取临时访问凭证。
        const info = await ComApiCon.instance.getSts();
        return {
          accessKeyId: info.AccessKeyId,
          accessKeySecret: info.AccessKeySecret,
          stsToken: info.SecurityToken,
        };
      },
      //地域
      region: AliOssConfig.region,
      //桶名
      bucket: AliOssConfig.bucket,
      //超时时间
      timeout: 60 * 1000,
    });
  }
}
