import { MainConfig } from './MainConfig';

/**
 * 前端配置
 * TODO 此模块只能前端导入
 */
export class WebConfig extends MainConfig {
  /**
   * 阿里云相关配置
   */
  static aliOss = {
    region: '',
    bucket: '',
  };
}
