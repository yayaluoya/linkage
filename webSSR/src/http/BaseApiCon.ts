import axios, { Method, AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
import { ApiConfig } from "./ApiConfig";
import { IResData } from "./res/IResData";
import { SecretCode } from "./SecretCode";
import { HttpStatus } from 'com_utils/HttpStatus';
import { HandleHttpData } from 'com_utils/handleHttpData';
import { Env } from "@/_d/Env";
import { Crypto_ } from "@/utils/Crypto_";

/** 自定义的请求op类型 */
interface AxiosRequestConfig_<T = any> extends AxiosRequestConfig<T>, ComN.IDataHandle { }

/**
 * 基类api控制器
 */
export class BaseApiCon {
    /** 缓存响应列表 */
    private cacheResList: Map<string, Promise<any>> = new Map();

    /** 请求实例 */
    axios_: AxiosInstance;
    /** 默认选项 */
    private _op: AxiosRequestConfig_ = {
        baseURL: '',
        timeout: 1000 * 60,
    };

    /** 可配置选项 */
    protected get op(): AxiosRequestConfig_ {
        return {
            headers: {},
        };
    };

    /** 根路径 */
    get rootApi() {
        return ApiConfig.apiPath;
    }

    //
    constructor() {
        this.axios_ = axios.create({
            ...this._op,
            ...this._op,
            headers: {
                ...this._op.headers,
                ...this.op.headers,
            },
        });
        // Add a request interceptor
        this.axios_.interceptors.request.use((config) => {
            // Do something before request is sent
            //设置暗号
            // console.log(config);
            return SecretCode.setSC(config);
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        // Add a response interceptor
        this.axios_.interceptors.response.use((response) => {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            // console.log('响应', response);
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });
    }

    /**
     * 删除缓存
     * @param _key 
     */
    protected removeCache(_key: string) {
        this.cacheResList.delete(_key);
    }

    /**
     * 设置缓存
     * @param _key 缓存键
     * @param _res 缓存响应
     */
    protected setCache(_key: string, _res: Promise<any>) {
        this.cacheResList.set(_key, _res);
    }

    /**
     * 获取缓存值
     * @param _key 
     * @param _getRes 获取默认值的函数，如果没有找到缓存就调用这个函数并缓存它的返回值
     * @returns 
     */
    protected getCache<T = any>(_key: string, _getRes?: () => Promise<T>): Promise<T> {
        if (this.cacheResList.has(_key)) {
            return this.cacheResList.get(_key)!;
        } else if (_getRes) {
            let _res = _getRes();
            this.setCache(_key, _res);
            return _res;
        }
        return Promise.reject('');
    }

    /**
     * 发送请求
     * 不管什么请求一律解决，通过状态码来判断是否成功
     * @param _op 请求配置
     * @returns 
     */
    request<Data = any>(_op: AxiosRequestConfig_): Promise<IResData<Data, AxiosResponse>> {
        //严格记录s端发送的请求
        Env.ifS && console.log('S端发送请求', _op.method, _op.url,);
        //添加请求拦截器
        return this.request_({
            ...this._op,
            ...this.op,
            ..._op,
            headers: {
                ...this._op.headers,
                ...this.op.headers,
                ..._op.headers,
            },
        }).then((config) => {
            //对请求发送之前的数据做一定处理，主要是加密和压缩
            if (config['x-data-handles'] && config['x-data-handles'].length > 0) {
                if (config.data) {
                    config.data = {
                        data: HandleHttpData.handle(config.data, config['x-data-handles'], Crypto_),
                    };
                }
                if (config.params) {
                    for (let i in config.params) {
                        config.params[i] = HandleHttpData.handle(config.params[i], config['x-data-handles'], Crypto_);
                    }
                }
                //把数据处理的流程添加到请求头中
                ((config.headers || {} as any) as ComN.IReqHead)['x-data-handles'] = JSON.stringify(config['x-data-handles']) as any;
            }
            return this.axios_(config).then(res => {
                let _resData: IResData = res.data || {};
                //附带上原始响应数据
                _resData.res = res;
                if (res.status != HttpStatus.OK) {
                    _resData.timestamp = Date.now();
                    _resData.data = null;
                    _resData.statusCode = res.status;
                    _resData.mes = '请求错误';
                } else {
                    //解析数据，主要判断数据是否被加密或者压缩
                    _resData.data = HandleHttpData.handle_(_resData.data, _resData['x-data-handles'], Crypto_);
                }
                //添加响应拦截
                return this.response_(_resData);
            }).catch((err) => {
                console.error('请求错误', err);
                let _resData: IResData = {
                    timestamp: Date.now(),
                    mes: '请求错误',
                    data: null,
                    statusCode: HttpStatus.BAD_REQUEST,
                    res: null,
                };
                return _resData;
            });
        });
    }

    /**
     * 发送请求获取数据
     * @param _op 
     * @returns 
     */
    requestData<Data = any>(_op: AxiosRequestConfig_): Promise<Data> {
        return this.request(_op).then((reqData) => {
            // console.log('请求回调', reqData);
            if (reqData.statusCode == HttpStatus.OK) {
                return reqData.data;
            } else {
                throw reqData;
            }
        });
    }

    /**
     * get请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    getData<Data = any>(_op: Omit<AxiosRequestConfig_, 'method'>): Promise<Data> {
        return this.requestData({
            ..._op,
            method: 'get',
        });
    }
    /**
     * post请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    postData<Data = any>(_op: Omit<AxiosRequestConfig_, 'method'>): Promise<Data> {
        return this.requestData({
            ..._op,
            method: 'post',
        });
    }
    /**
     * put请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    putData<Data = any>(_op: Omit<AxiosRequestConfig_, 'method'>): Promise<Data> {
        return this.requestData({
            ..._op,
            method: 'put',
        });
    }
    /**
     * delete请求获取数据
     * @param _op 请求配置 
     * @param data 
     * @param headers 
     * @returns 
     */
    deleteData<Data = any>(_op: Omit<AxiosRequestConfig_, 'method'>): Promise<Data> {
        return this.requestData({
            ..._op,
            method: 'delete',
        });
    }

    /** 请求拦截 */
    protected async request_(_config: AxiosRequestConfig_) {
        return _config;
    }
    /** 响应拦截 */
    protected async response_(_res: IResData) {
        return _res;
    }
}