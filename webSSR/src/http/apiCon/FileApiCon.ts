import { ApiConfig } from "../ApiConfig";
import { InstanceTool } from "com_utils/InstanceTool"
import { AxiosRequestConfig } from "axios";
import { ApiCon_ } from "./ApiCon_";

/**
 * 文件api控制器
 */
@InstanceTool()
export class FileApiCon extends ApiCon_ {
    /** 单例 */
    static readonly instance: FileApiCon;

    /**  */
    protected get op(): AxiosRequestConfig {
        return {
            baseURL: ApiConfig.domainPath.web,
        };
    }

    /**
     * 上传文件
     * @param _file 目标文件
     * @returns 
     */
    update(_file: File) {
        let _formData = new FormData();
        _formData.set('file', _file);
        return this.postData<string>({
            url: ApiConfig.apiPath.file.update,
            data: _formData,
        });
    }
}