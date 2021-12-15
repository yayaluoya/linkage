import { HttpStatus } from "./HttpStatus";
import { IResData } from "./IResData";
import { RequstMedth } from "./RequstMedth";

/** 请求配置 */
export interface IRequestOp {
    /** 请求路径 */
    url: string
    /** 请求方法 */
    method?: RequstMedth
    /** 请求数据 */
    data?: Record<string, any>
    /** 请求头 */
    header?: Record<string, string>
    /** 超时时间 */
    timeout?: number
}

/**
 * 发送请求
 * 返回一个最终状态永远为成功的promise
 * 并整合数据格式
 * @param _op 请求配置
 */
export function wxRequest(_op: IRequestOp): Promise<IResData<WechatMiniprogram.RequestSuccessCallbackResult>> {
    return new Promise<IResData>((r) => {
        wx.request<IResData>({
            ..._op,
            success: (res) => {
                let _resData: IResData = res.data || {};
                //附带上原始响应数据
                _resData.res = res;
                //判断请求状态码
                if (res.statusCode != HttpStatus.OK) {
                    _resData.timestamp = Date.now();
                    _resData.data = null;
                    _resData.statusCode = res.statusCode;
                    _resData.mes = '请求错误';
                }
                r(_resData);
            },
            fail: (err) => {
                console.error('请求错误', err);
                let _resData: IResData = {
                    timestamp: Date.now(),
                    mes: '请求错误',
                    data: null,
                    statusCode: HttpStatus.BAD_REQUEST,
                    res: null,
                };
                _resData.res = null;
                r(_resData);
            },
        });
    });
}