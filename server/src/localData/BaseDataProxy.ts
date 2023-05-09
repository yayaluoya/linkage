import { LocalStorage_ as LocalStorage__ } from 'yayaluoya-tool/dist/node/localData/LocalStorage_';
import { BaseDataProxy as BaseDataProxy_ } from 'yayaluoya-tool/dist/node/localData/BaseDataProxy';
import { PathManager } from 'pathManager/PathManager';
import { instanceTool } from 'yayaluoya-tool/dist/instanceTool';

@instanceTool()
class LocalStorage_ extends LocalStorage__ {
    static readonly instance: LocalStorage_;

    get getPath(): string {
        return PathManager.localDataPath;
    }
}

/**
 * 基类本地数据代理
 */
export abstract class BaseDataProxy<D = any> extends BaseDataProxy_<D> {
    get LocalStorage_() {
        return LocalStorage_.instance;
    }
}
