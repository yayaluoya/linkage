import { PathManager as PathManager_ } from "@utils/dist/PathManager";
import { join } from "path";
/**
 * 资源路径管理器
 */
export class PathManager extends PathManager_ {
    /** 获取打包文件路径 */
    static get distPath(): string {
        return join(this.server, '/dist');
    }
    /** 本地数据存储路径 */
    static get localDataPath(): string {
        return join(this.server, '/_localData');
    }
    /** 公共文件存储路径 */
    static get publicFilePath(): string {
        return join(this.server, '/_public');
    }
    /** 公共文件虚拟目录 */
    static get publicFilePrefix(): string {
        return '/static/';
    }
    /** 数据路径 */
    static get dataPath(): string {
        return join(this.server, '_data');
    }
}