import axios, { Method, AxiosResponse, AxiosRequestConfig as AxiosRequestConfig_, AxiosInstance } from "axios";
import { HandleHttpData } from 'global-module/dist_esm/HandleHttpData';
import { BaseApiCon as BaseApiCon_ } from "yayaluoya-tool/dist/node/BaseApiCon";
import { ResData } from "global-module/dist_esm/ResData";
import { HttpStatus } from "yayaluoya-tool/dist/http/HttpStatus";
import { SecretCode } from "./SecretCode";

/** 自定义的请求op类型 */
interface AxiosRequestConfig<T = any> extends AxiosRequestConfig_<T>, ComN.IDataHandle { }

/**
 * 基类api控制器
 */
export class BaseApiCon extends BaseApiCon_ {
    /** 可配置选项 */
    get op(): AxiosRequestConfig {
        return {
            baseURL: import.meta.env.VITE_BASE_URL,
            timeout: 1000 * 60 * 5,
        };
    }

    /**
     * get请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    getData<D = any>(_op: AxiosRequestConfig) {
        return super.getData<D>(_op);
    }
    /**
     * post请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    postData<D = any>(_op: AxiosRequestConfig) {
        return super.postData<D>(_op);
    }
    /**
     * put请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    putData<D = any>(_op: AxiosRequestConfig) {
        return super.putData<D>(_op);
    }
    /**
     * delete请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    deleteData<D = any>(_op: AxiosRequestConfig) {
        return super.deleteData<D>(_op);
    }

    /** 
     * 响应数据获取
     * 如果响应成功的话返回 ResData
     * 如果响应失败的话抛出ResData的异常
     */
    resData_(data: ResData, con: boolean, res: any) {
        if (data.status != HttpStatus.OK) {
            throw data;
        }
        return data;
    }

    /** 请求拦截 */
    protected async request_(_: any) {
        //添加响应头
        let config: AxiosRequestConfig = _;
        //
        if (config['x-data-handles'] && config['x-data-handles'].length > 0) {
            if (config.data) {
                config.data = {
                    data: HandleHttpData.handle(config.data, config['x-data-handles']),
                };
            }
            if (config.params) {
                for (let i in config.params) {
                    config.params[i] = HandleHttpData.handle(config.params[i], config['x-data-handles']);
                }
            }
            //把数据处理的流程添加到请求头中
            ((config.headers || {} as any) as ComN.IReqHead)['x-data-handles'] = JSON.stringify(config['x-data-handles']) as any;
        }
        return SecretCode.setSC(config).then(_ => {
            return _ as any;
        });
    }
    /** 
     * 响应拦截
     * 失败的话抛出AxiosResponse的异常
     */
    protected async response_(_: any) {
        let res = _ as AxiosResponse;
        //解析数据，主要判断数据是否被加密或者压缩
        let handleType = [];
        try {
            handleType = JSON.parse((res.headers as ComN.IDataHandle)["x-data-handles"] as any);
        }
        catch { }
        let data = HandleHttpData.handle_(res.data || null, handleType) as ResData;
        res.data = data;
        //
        return res as any;
    }
}