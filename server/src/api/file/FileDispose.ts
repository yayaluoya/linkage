import { IFileData } from "./IFileData";
import { PathManager } from "pathManager/PathManager";
import { join, relative } from "path";
import { mkdirSync, rmSync, writeFile, statSync } from "fs";
import { HttpStatus } from "@nestjs/common";
import { ResData } from "@utils/dist/ResData";
import { AliOssT } from "utils/AliOssT";
import * as moment from "moment";
import { URLT } from "yayaluoya-tool/dist/http/URLT";

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
            } catch { }
            //获取完整url并去除掉特殊字符
            let _url: string = join(_dir, packFileName(file.originalname));
            //保存文件
            writeFile(_url, file.buffer, (err) => {
                if (err) {
                    console.log('存储文件失败！', e);
                    r(new ResData('', HttpStatus.INTERNAL_SERVER_ERROR, '存储文件失败！'));
                    return;
                }
                r(new ResData(
                    new URLT(
                        join(
                            PathManager.publicFilePrefix,
                            relative(PathManager.publicFilePath, _url)
                        )
                    ).path
                ));
            });
        });
    }

    /**
     * 上传文件到阿里云
     * @param file 
     */
    public uploadToAliOSS(file: IFileData): Promise<ResData> {
        return AliOssT.instance.updateFile(file.buffer, `${moment().format('Y-M-D')}/${packFileName(file.originalname)}`).then((str) => {
            return new ResData(str);
        });
    }

    /**
     * 删除文件
     * @param url_ 
     */
    public remove(url_: string) {
        let url = new URLT(url_);
        if (/aliyuncs.com/.test(url.origin)) {
            return AliOssT.instance.client.delete(url.path).then(() => {
                return new ResData('文件已从阿里云上删除');
            }).catch((e) => {
                console.log('阿里云删除文件失败', e);
                return new ResData().fail('阿里云删除文件失败');
            });
        } else {
            try {
                let filePath = join(
                    PathManager.publicFilePath,
                    relative(PathManager.publicFilePrefix, url.path)
                );
                if (statSync(filePath, {
                    throwIfNoEntry: false,
                })?.isFile()) {
                    rmSync(filePath);
                }
            } catch (e) {
                console.log('删除本地文件失败', e);
                return new ResData().fail('删除本地文件失败');
            }
            return new ResData('本地文件已删除');
        }
    }
}

/**
 * 包装文件名
 * @param str 
 * @returns 
 */
function packFileName(str: string): string {
    let url = new URLT(str);
    return Date.now() + '-' + url.path.replace(/^\//, '').replace(/[^\w./]/g, '');
}