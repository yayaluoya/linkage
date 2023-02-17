import { LocalStorage_ as LocalStorage__ } from "yayaluoya-tool/dist/node/localData/LocalStorage_";
import { BaseDataProxy as BaseDataProxy_ } from "yayaluoya-tool/dist/node/localData/BaseDataProxy";
import { PathManager } from "pathManager/PathManager";
import { mkdirSync } from "fs";

class LocalStorage_ extends LocalStorage__ {
    /** 
     * 获取数据存储路径
     * TODO 需要重写
     */
    static get getPath(): string {
        return PathManager.localDataPath;
    }
}

/**
 * 基类本地数据代理
 */
export abstract class BaseDataProxy<D = any> extends BaseDataProxy_<D> {
    get LocalStorage_() {
        return LocalStorage_;
    }

    constructor() {
        super();
        mkdirSync(this.LocalStorage_.getPath, {
            recursive: true,
        });
    }
}