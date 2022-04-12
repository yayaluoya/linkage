import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
/**
 * 资源路径管理器
 */
export class PathManager {
    /** 获取项目根路径 */
    static get rootPath(): string {
        return join(__dirname, '../../');
    }

    /** 获取打包文件路径 */
    static get distPath(): string {
        return join(this.rootPath, '/dist');
    }

    /** 本地数据存储路径 */
    static get localDataPath(): string {
        return join(this.rootPath, '/_localData');
    }
    /** 公共文件存储路径 */
    static get publicFilePath(): string {
        return join(this.rootPath, '/_public');
    }
    /** 公共文件虚拟目录 */
    static get publicFilePrefix(): string {
        return '/static/';
    }
    /** 设置静态文件代理 */
    static setStaticFileProxy(_app: NestExpressApplication) {
        _app.useStaticAssets(this.publicFilePath, {
            prefix: this.publicFilePrefix,
        });
    }
    /** 数据路径 */
    static get dataPath(): string {
        return join(this.rootPath, '_data');
    }
}