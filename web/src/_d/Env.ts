import { JSONPar } from 'yayaluoya-tool/dist_esm/JSONPar';

interface ImportMetaEnv_ extends ImportMetaEnv {
  /** 测试字符串 */
  VITE_TEST: string;
  /** baseURL */
  VITE_BASE_URL: string;
  /** 阿里云配置 */
  VITE_AliOss: string;
}

/**
 * Env
 * TODO 统一获取环境变量
 */
export class Env {
  /** 环境值 */
  static get value() {
    return import.meta.env as ImportMetaEnv_;
  }

  /** 测试字符串 */
  static get testText() {
    return Env.value.VITE_TEST;
  }

  /** 是否是调试模式 */
  static get ifDev(): boolean {
    return Env.value.MODE == 'development';
  }

  /** 是否是生产模式 */
  static get ifPro(): boolean {
    return Env.value.MODE == 'production';
  }

  /** 调试模式 */
  static get DEV(): boolean {
    return Env.value.DEV;
  }

  /** 生产模式 */
  static get PROD(): boolean {
    return Env.value.PROD;
  }

  /** 阿里云配置 */
  static get AliOss() {
    return JSONPar<{
      region?: string;
      bucket?: string;
    }>(Env.value.VITE_AliOss, {});
  }

  /** baseURL */
  static get BASE_URL() {
    return Env.value.VITE_BASE_URL;
  }
}
