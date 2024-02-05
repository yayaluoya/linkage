import path from 'path';
import { MainConfig } from './MainConfig';
import { PathManager } from './PathManager';

/**
 * 后端配置
 * TODO 此模块只能后端导入
 */
export class ServerConfig extends MainConfig {
  /** 端口 */
  static port = 6202;
  /** 暗号相关 */
  static secretCode = {
    /** 是否验证 */
    v: false,
    /** 过期时间 */
    overrunTime: 60 * 1000,
  };
  /** 公共文件缓存时间 */
  static publicFileMaxAge = 1000 * 60 * 60 * 24 * 360;
  /**
   * 阿里云相关配置
   * TODO 测试用的临时配置
   */
  static aliOss = {
    region: '',
    bucket: '',
    access: {
      accessKeyId: '',
      accessKeySecret: '',
    },
    roleArn: '',
  };
  /** 关于orm的配置 */
  static orm = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: '',
    entities: [path.join(PathManager.server, './dist/db/entities/**/*{.ts,.js}')],
    synchronize: true,
  };
}
