import { ResData } from "src/http/ResData";
import { IFileData } from "./IFileData";
import { PathManager } from "src/pathManager/PathManager";
import { join, relative } from "path";
import { mkdirSync, writeFile } from "fs";
import { HttpStatus } from "@nestjs/common";
import { DataT } from "src/utils/DataT";
const moment = require('moment');

/**
 * 文件处理类
 */
export default class FileDispose {
    /**
     * 上传文件
     * @param file 文件数据
     */
    public uploadFile(file: IFileData): Promise<ResData> {
        return new Promise<ResData<any>>((r, e) => {
            //创建当天时间目录
            let _time: string = moment().format('YYYY-M-D');
            //先创建目录
            try {
                mkdirSync(join(PathManager.publicFilePath, _time));
            } catch (E) {
                //已经存在该目录
            }
            //获取完整url并去除掉特殊字符
            let _url: string = join(PathManager.publicFilePath, _time + '/' + Date.now() + '-' + file.originalname.replace(/[^a-zA-Z\.0-9]+/g, ''));
            //保存文件
            writeFile(_url, file.buffer, (err) => {
                if (err) {
                    r(new ResData(err, HttpStatus.INTERNAL_SERVER_ERROR, '存储文件失败！'));
                    return;
                }
                r(new ResData(
                    DataT.finishingUrl(
                        join(
                            PathManager.publicFilePrefix,
                            relative(PathManager.publicFilePath, _url)
                        )
                    )
                ));
            });
        });
    }
}