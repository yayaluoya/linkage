import { readFileSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { PathManager } from "src/pathManager/PathManager";
import { DirTool } from "src/utils/DirTool";

/**
 * 本地数操作工具
 * 仿前端接口的一个同步文件数据管理工具
 */
export class LocalStorage_ {
    /** 获取数据存储路径 */
    private static getDataPath(key: string): string {
        return join(PathManager.localDataPath, `/${key}.json`);
    }

    /**
     * 获取数据项
     * @param key 数据的键名
     */
    static getItem<Data>(key: string): Data {
        let _dataPath = this.getDataPath(key);
        try {
            //从本地数据存储文件夹中找到目标文件并读取获取出来并序列化成目标类型的数据
            return JSON.parse(readFileSync(_dataPath).toString()) as Data;
        } catch {
            //说明该数据有误或者本来就没有，应该删除这个文件
            this.deleteItem(key);
            return null;
        }
    }

    /**
     * 设置数据项
     * @param key 原数据
     * @param data 
     */
    static setItem(key: string, data: string | object) {
        data = JSON.stringify(data);
        //直接写入文件
        writeFileSync(this.getDataPath(key), data);
    }

    /**
     * 清除一个数据项
     * @param key 
     */
    static deleteItem(key: string) {
        try {
            unlinkSync(this.getDataPath(key));
        } catch { };
    }

    /**
     * 清除全部数据
     */
    static clear() {
        DirTool.delDirChildSync(PathManager.localDataPath);
    }
}