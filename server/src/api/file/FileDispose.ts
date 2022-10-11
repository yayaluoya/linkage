import { IFileData } from "./IFileData";
import { PathManager } from "pathManager/PathManager";
import { join, relative } from "path";
import { mkdirSync, writeFile } from "fs";
import { HttpStatus } from "@nestjs/common";
import { DataT } from "utils/DataT";
import { ResData } from "@utils/ResData";
// import { AliOssT } from "utils/AliOssT";
const moment = require('moment');

/**
 * 文件处理类
 */
export default class FileDispose {
    /**
     * 上传img文件
     * @param file 
     */
    public uploadImg(file: IFileData) {
        return this.uploadFile(file, 'img');
    }

    /**
     * 上传md文件
     * @param file 
     */
    public uploadMd(file: IFileData) {
        return this.uploadFile(file, 'md');
    }

    /**
     * 上传文件
     * @param file 文件数据
     * @param dir 中间目录，默认为com
     */
    public uploadFile(file: IFileData, dir: string = 'com'): Promise<ResData> {
        return new Promise<ResData<any>>((r, e) => {
            //创建当天时间目录
            let _time: string = moment().format('YYYY-M-D');
            /** 存储目录 */
            let _dir: string = join(PathManager.publicFilePath, dir, _time);
            //先创建目录
            try {
                mkdirSync(_dir, {
                    //递归创建目录
                    recursive: true,
                });
            } catch (E) {
                // console.log('创建目录失败', E);
                //已经存在该目录
            }
            //获取完整url并去除掉特殊字符
            let _url: string = join(_dir, Date.now() + '-' + file.originalname.replace(/[^a-zA-Z\.0-9]+/g, ''));
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

    /**
     * 上传文件到阿里云
     * @param file 
     */
    public uploadFileToAliOSS(file: IFileData): Promise<ResData> {
        return Promise.resolve(new ResData().fial('缺少配置'));
        // let _fileNames = file.originalname.
        //     replace(/[^a-zA-Z\.0-9]+/g, '')
        //     .split(/\.(?=[a-zA-Z]+$)/);
        // let _fileName = `${_fileNames[0]}-${Date.now()}.${_fileNames[1]}`;
        // return AliOssT.updateFile(file.buffer, `${moment().format('Y-M-D')}/${_fileName}`).then((str) => {
        //     return new ResData(str);
        // });
    }
}