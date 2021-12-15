import { join, isAbsolute } from "path";
import { PathManager } from "src/pathManager/PathManager";
import { ConnectionOptions } from "typeorm";
const typeormConfig = require("../../typeormConfig.json");

/**
 * 把entities中的路径转成绝对路径
 */
typeormConfig.entities = typeormConfig.entities.map((item) => {
    let path: string;
    if (isAbsolute(item)) {
        path = item;
    } else {
        //用项目目录来拼接
        path = join(PathManager.rootPath, item);
    }
    return path.replace(/\\/g, '/');
});

/**
 * 数据库配置
 */
export const dbConfig: ConnectionOptions = typeormConfig;