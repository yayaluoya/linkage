import { AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseApiCon } from "../BaseApiCon";
import { JSONTransform } from "@/utils/JSONTransform";
import { EmojiT } from "yayaluoya-tool/dist/EmojiT";
import { ResData } from "global-module/dist_esm/ResData";
import { UserDataProxy } from "@/localData/UserDataProxy";

/**
 * api拦截器
 */
export class ApiCon extends BaseApiCon {
    /** 请求拦截 */
    protected async request_(_config: AxiosRequestConfig<any>) {
        //添加响应头
        (_config.headers || (_config.headers = {}) as ComN.IReqHead)['x-token'] = UserDataProxy.instance.token || '';
        //对请求的数据中的表情符号进行转码
        _config.params = JSONTransform(_config.params, EmojiT.utf16toEntities);
        _config.data = JSONTransform(_config.data, EmojiT.utf16toEntities);
        //
        return super.request_(_config);
    }

    /** 响应拦截 */
    protected async response_(_res: ResData<any>) {
        return super.response_(_res).then(_res => {
            //对响应数据中的表情进行解码
            _res.data = JSONTransform(_res.data, EmojiT.entitiestoUtf16);
            return _res;
        });
    }
}