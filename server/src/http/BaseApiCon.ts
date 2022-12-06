import { HttpStatus } from "@nestjs/common";
import { type AxiosPromise, type AxiosResponse } from "axios";
import { ResData } from "@utils/dist/ResData";
import { BaseApiCon as BaseApiCon_ } from "yayaluoya-tool/dist/node/BaseApiCon";

/**
 * 基类api处理器
 */
export class BaseApiCon extends BaseApiCon_ {
    /** 
     * 响应数据获取
     * 如果响应成功的话返回 ResData
     * 如果响应失败的话抛出ResData的异常
     */
    protected resData_(data: any, con: boolean, res: AxiosResponse): ResData {
        return new ResData(data, res.status);
    }

    /** 
     * 响应拦截
     * 失败的话抛出AxiosResponse的异常
     */
    protected async response_(res) {
        if ((res as AxiosResponse).status != HttpStatus.OK) {
            throw res;
        }
        return res;
    }
}