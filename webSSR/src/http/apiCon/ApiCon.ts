import { UserDataProxy } from "@/localData/dataItem/UserDataProxy";
import { type PageTool } from "@/router/PageTool";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseApiCon } from "../BaseApiCon";
import { IResData } from "../res/IResData";
import { JSONTransform } from "@/utils/JSONTransform";
import { entitiestoUtf16, utf16toEntities } from "@/utils/Emoji";
import { EPage } from "@/router/EPage";
import { SingleDependence } from "@/utils/SingleDependence";

/** 需要登录的状态码 */
const needLoginStatusCode: number = 504;

const token = 'token';

/**
 * api拦截器
 */
export class ApiCon extends BaseApiCon {
    /** 请求拦截 */
    protected async request_(_config: AxiosRequestConfig<any>) {
        //添加响应头
        (_config.headers || (_config.headers = {}) as ComN.IReqHead)['x-token'] = UserDataProxy.instance.token || token;

        //对请求的数据中的表情符号进行转码
        _config.params = JSONTransform(_config.params, utf16toEntities);
        _config.data = JSONTransform(_config.data, utf16toEntities);

        //
        return _config;
    }

    /** 响应拦截 */
    protected async response_(_res: IResData<any>) {
        //如果这个接口需要登录才能用的话就跳到登录页面
        if (_res.statusCode == needLoginStatusCode) {
            console.error(_res.mes);
            UserDataProxy.instance.resetData();
            SingleDependence.get<typeof PageTool>('PageTool').toBackPage(EPage.login);
            //
            return _res;
        }

        //对响应数据中的表情进行解码
        _res.data = JSONTransform(_res.data, entitiestoUtf16);

        return _res;
    }
}