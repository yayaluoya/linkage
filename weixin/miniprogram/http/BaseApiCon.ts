import { ApiConfig } from "./ApiConfig";
import { ApiTool } from "./ApiTool";
import { HttpStatus } from "./res/HttpStatus";
import { IResData } from "./res/IResData";
import { IRequestOp, wxRequest } from "./res/wxRequest";
import { SecretCode } from "./SecretCode";

/** 基类api选项 */
export type IBaseApiOp = Omit<IRequestOp, 'url'> & {
    /** 根路径 */
    baseUrl?: string;
};

/**
 * 基类api控制器
 */
export class BaseApiCon {
    /** 缓存响应列表 */
    private static cacheResList: Map<string, Promise<any>> = new Map();

    /** 默认配置
     * 真正发送请求的时候会合并这个配置 
     * 优先级最低
     * */
    private static _op: Omit<IRequestOp, 'url'> = {
        /** 超时时间为1分钟 */
        timeout: 1000 * 60,
    };

    /** 可覆盖的配置 */
    protected static get op(): IBaseApiOp {
        return {};
    }

    /** 根路径 */
    static get rootApi() {
        return ApiConfig.apiPath;
    }

    /**
     * 设置缓存
     * @param _key 缓存键
     * @param _res 缓存响应
     */
    protected static setCache(_key: string, _res: Promise<any>) {
        this.cacheResList.set(_key, _res);
    }

    /**
     * 获取缓存值
     * @param _key 
     * @param _getRes 获取默认值的函数，如果没有找到缓存就调用这个函数并缓存它的返回值
     * @returns 
     */
    protected static getChche<T = any>(_key: string, _getRes?: () => Promise<T>): Promise<T> | null {
        if (this.cacheResList.has(_key)) {
            return this.cacheResList.get(_key)!;
        } else if (_getRes) {
            let _res = _getRes();
            this.setCache(_key, _res);
            return _res;
        }
        return null;
    }

    /**
     * 发送请求
     * @param _op 
     */
    static request(_op: IRequestOp): Promise<IResData<WechatMiniprogram.RequestSuccessCallbackResult>> {
        //合并op
        _op.method = _op.method || this._op.method;
        _op.data = {
            ...this._op.data,
            ...this.op.data,
            ..._op.data,
        }
        _op.header = {
            ...this._op.header,
            ...this.op.header,
            ..._op.header,
        };
        _op.timeout = _op.timeout || this.op.timeout || this._op.timeout;
        //发送请求，并加上前置后置处理器
        return this._before(_op).then(op => wxRequest(op)).then((data) => {
            return this._after(data);
        });
    }

    /**
     * 发送请求获取其中的data
     * @param _op 
     */
    static requestData<Data = any>(_op: IRequestOp): Promise<Data> {
        return this.request(_op).then((reqData: IResData<any>) => {
            if (reqData.statusCode == HttpStatus.OK) {
                return reqData.data;
            } else {
                throw reqData;
            }
        });
    }

    /**
     * get请求获取数据
     * @param _op 
     * @returns 
     */
    static getData<Data = any>(url: string, data = undefined, headers = undefined): Promise<Data> {
        return this.requestData({
            url,
            method: 'GET',
            data,
            header: headers,
        });
    }
    /**
     * post请求获取数据
     * @param _op 
     * @returns 
     */
    static postData<Data = any>(url: string, data = undefined, headers = undefined): Promise<Data> {
        return this.requestData({
            url,
            method: 'POST',
            data,
            header: headers,
        });
    }
    /**
     * put请求获取数据
     * @param _op 
     * @returns 
     */
    static putData<Data = any>(url: string, data = undefined, headers = undefined): Promise<Data> {
        return this.requestData({
            url,
            method: 'PUT',
            data,
            header: headers,
        });
    }
    /**
     * delete请求获取数据
     * @param _op 
     * @returns 
     */
    static deleteData<Data = any>(url: string, data = undefined, headers = undefined): Promise<Data> {
        return this.requestData({
            url,
            method: 'DELETE',
            data,
            header: headers,
        });
    }

    /** 请求前置处理器，默认是加上了请求暗号 */
    protected static _before(_op: IRequestOp): Promise<IRequestOp> {
        return SecretCode.setSC(_op).then(_op => {
            //如果有根路径的配置的话就加上根路径
            if (this.op.baseUrl) {
                _op.url = ApiTool.joinApi(this.op.baseUrl, _op.url);
            }
            //
            return _op;
        });
    }
    /** 请求后置处理器，默认不处理 */
    protected static _after(res: IResData<any>): Promise<IResData<WechatMiniprogram.RequestSuccessCallbackResult>> {
        return Promise.resolve(res);
    }
}