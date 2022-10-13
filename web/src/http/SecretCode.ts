import { confusionStr } from "com_utils/confusionStr";
import axios, { AxiosRequestConfig } from "yayaluoya-tool/node_modules/axios";
import { Base64 } from "yayaluoya-tool/dist/Base64";
import { ResData } from "com_utils/ResData";
import { URLT } from "yayaluoya-tool/dist/http/URLT";

let axios_ = axios.create();

/**
 * 暗号
 */
export class SecretCode {
    /** 设置暗号 */
    static setSC(_res: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        return new Promise((r) => {
            let _onlyKey = `@${Date.now()}-${Math.random().toString().replace(/^0\./, '')}`;
            this.getTimeDiff()
                .then((time) => {
                    // console.log('客户端与后端时间差为', time);
                    //真实时间是当前时间加上后端与当前客户端的时间差组成
                    time = time + Date.now();
                    (_res.headers || (_res.headers = {}) as ComN.IReqHead)['x-secret-code'] = Base64.encode(JSON.stringify({
                        key: _onlyKey,
                        time,//后端需要比对的时间，这个用明文
                        v: confusionStr(`${_onlyKey}-${time}`),
                    }));
                    r(_res);
                });
        });
    }

    /** 获取客户端与后端的时间差的异步任务 */
    private static getTimeDiffP: Promise<number>;
    /** 获取服务器与客户端时间差 */
    public static getTimeDiff(): Promise<number> {
        let _time = Date.now();
        if (!this.getTimeDiffP) {
            // console.log('获取时间');
            this.getTimeDiffP = axios_
                .get(new URLT('/time/getTime', import.meta.env.VITE_BASE_URL).href)
                .then((data) => {
                    return data.data;
                }).then((data: ResData<number>) => {
                    return data.data! - _time;
                }).catch(() => {
                    //如果没有获取到后端的时间戳就使用当前电脑本地的时间戳并抛出异常
                    console.error('同步时间戳出错了!');
                    //
                    return Date.now();
                });
        }
        return this.getTimeDiffP;
    }
}

//
SecretCode.getTimeDiff();