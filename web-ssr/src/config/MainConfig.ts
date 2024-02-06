import { WebConfig } from 'global-module/dist/WebConfig';
import { ObjectUtils } from 'yayaluoya-tool/dist/obj/ObjectUtils';
import { Env } from '@/_d/Env';

/**
 * 全局配置
 */
export class MainConfig extends WebConfig {
  //
}

/**
 * 合并一些本地的配置
 */
ObjectUtils.merge(MainConfig.aliOss, Env.AliOss);
