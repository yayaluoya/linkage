import { EPage } from "@/router";
import { message } from "ant-design-vue";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseApiCon } from "../BaseApiCon";
import { IResData } from "../res/IResData";
import router from "@/router";

/** 用户token失效的状态码 */
const userNoToken: number = 444;

/**
 * api拦截器
 */
export class ApiCon_ extends BaseApiCon {
    /** 请求拦截 */
    protected async request_(_config: AxiosRequestConfig<any>) {
        //添加相应头
        (_config.headers || (_config.headers = {}))['token'] = '';
        //
        return _config;
    }

    /** 响应拦截 */
    protected async response_(_res: IResData<any>) {
        //当响应状态为未登录时
        if (_res.statusCode == userNoToken) {
            //
            return _res;
        }
        return _res;
    }
}