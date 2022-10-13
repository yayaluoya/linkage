import { instanceTool } from "yayaluoya-tool/dist/instanceTool"
import moment from "moment";
import { AliOssT } from "@/utils/AliOssT";
import { ApiCon } from "./ApiCon";

/**
 * 文件api控制器
 */
@instanceTool()
export class FileApiCon extends ApiCon {
    /** 单例 */
    static readonly instance: FileApiCon;

    /**
     * 上传文件到服务器
     * @param _file 目标文件
     * @returns 
     */
    update(_file: File) {
        let _formData = new FormData();
        _formData.set('file', _file);
        return this.postData<string>({
            url: '/file/upload',
            data: _formData,
        });
    }

    /**
     * 通过服务器上传到阿里云
     * @param _file 
     */
    updateToALIYunOSS(_file: File) {
        let _formData = new FormData();
        _formData.set('file', _file);
        return this.postData<string>({
            url: '/file/uploadToAliOSS',
            data: _formData,
        })
    }

    /**
     * 删除文件
     * @param url 
     */
    remove(url: string) {
        return this.deleteData({
            url: '/file/remove',
            data: { url },
        });
    }

    /**
     * 上传到阿里云oss
     * @param _file 
     */
    updateALIYunOSS(_file: File): Promise<string> {
        let _fileNames = _file.name
            .replace(/[^a-zA-Z\.0-9]+/g, '')
            .split(/\.(?=[a-zA-Z]+$)/);
        let _fileName = `${_fileNames[0]}-${Date.now()}.${_fileNames[1]}`;
        //
        return AliOssT.instance.updateFile(_file, `${moment().format('Y-M-D')}/${_fileName}`).then((res) => {
            return res;
        }).catch((e) => {
            console.error(e);
            throw '阿里云OSS上传失败';
        });
    }

    /**
     * 通过一个url获取阿里云oss上的链接
     * 先把这个远程文件下载下来，然后再上传到阿里云oss上
     * @param _url 
     */
    byUrlGetALIYunOSS(_url: string): Promise<string> {
        let fileName = _url.split('/')?.at(-1)!.split('?')[0];
        return fetch(_url).then((req) => {
            return req.blob();
        }).then((blob) => {
            return this.updateALIYunOSS(new File([blob], fileName));
        }).catch((e) => {
            console.error(e);
            throw '上传图片失败';
        });
    }
}