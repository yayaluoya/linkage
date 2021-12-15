import { HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/** 自定义选项 */
export type cuBaseApiOp = Pick<AxiosRequestConfig, 'baseURL' | 'headers' | 'timeout'>;

/**
 * 基类api控制器
 */
export abstract class BaseApiCon {
    readonly axios: AxiosInstance;
    /** 默认选项 */
    private op: cuBaseApiOp = {
        baseURL: '',
        headers: {},
        timeout: 60 * 1000,
    };
    /** 继承覆盖选项 */
    protected get _op(): cuBaseApiOp {
        return {};
    }

    //
    constructor(_op?: AxiosRequestConfig) {
        this.axios = axios.create({
            ..._op,
            ...this.op,
            ...this._op,
            headers: {
                ...this.op.headers,
                ...this._op?.headers,
            },
        });
        //添加前置或者后置处理器
        this.axios.interceptors.request.use((config) => {
            return this.request_(config);
        }, (e) => {
            return e;
        });
        this.axios.interceptors.response.use((res) => {
            return this.response_(res);
        }, (e) => {
            return e;
        });
    }

    /** 
     * 拼接api
     */
    joinApi(url: string, pathArgs?: Record<string, string>): string {
        //替换url中的路径参数
        if (pathArgs) {
            for (let i in pathArgs) {
                url = url.replace(new RegExp(`[/{]+${i}[/}]+`, 'g'), `/${pathArgs[i]}/`);
            }
        }
        //最后加上根路径
        let baseUrl = (this.op.baseURL || this._op?.baseURL || '').replace(/\/+$/, '');
        url = url.replace(/[\\/]+/g, '/').replace(/^\//, '');
        //
        return `${baseUrl}/${url}`;
    }

    /**
     * 添加查询参数
     * @param _url 原url
     * @param _query 查询参数
     */
    addQuery(_url: string, _query: Record<string, string> = {}): string {
        if (!_url) { return _url; }
        //先提取原_url参数
        let urlStructure = _url.split('?');
        let __url = urlStructure[0];
        let __query = new URLSearchParams(urlStructure[1] || '');
        for (let i in _query) {
            __query.set(i, _query[i]);
        }
        return `${__url}?${__query.toString()}`;
    }

    /**
     * 发送request请求
     * @param _con 请求配置
     * @returns 
     */
    request<D = any>(_con: AxiosRequestConfig<D>): Promise<D> {
        return this.axios(_con).then((res) => {
            if (res.status == HttpStatus.OK) {
                return res.data;
            } else {
                throw res;
            }
        });
    }

    /** 发送put请求 */
    put<D = any>(_con: AxiosRequestConfig<D>) {
        _con.method = 'put';
        return this.request(_con);
    }
    /** 发送delete请求 */
    delete<D = any>(_con: AxiosRequestConfig<D>) {
        _con.method = 'delete';
        return this.request(_con);
    }
    /** 发送post请求 */
    post<D = any>(_con: AxiosRequestConfig<D>) {
        _con.method = 'post';
        return this.request(_con);
    }
    /** 发送get请求 */
    get<D = any>(_con: AxiosRequestConfig<D>) {
        _con.method = 'get';
        return this.request(_con);
    }

    /** 请求前置 */
    protected request_(_config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        return Promise.resolve(_config);
    }
    /** 响应前置 */
    protected response_(_res: AxiosResponse): Promise<AxiosResponse> {
        return Promise.resolve(_res);
    }
}