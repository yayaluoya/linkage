import path from 'path';
/**
 * 路径管理器
 */
export class PathManager {
  /** 获取项目根路径 */
  static get rootPath(): string {
    return path.join(__dirname, '../');
  }

  /** 服务端路径 */
  static get server() {
    return path.join(this.rootPath, './server');
  }
  /** web端项目路径 */
  static get web() {
    return path.join(this.rootPath, './web');
  }
}
