import { Crypto } from "@/utils/Crypto";
import { AxiosRequestConfig } from "axios";
import { Base64 } from "../utils/Base64";
import { ApiConfig } from "./ApiConfig";
import { ApiTool } from "./ApiTool";
import { IResData } from "./res/IResData";

/** 暗号key */
const secretCodeKey = 'secret-code';

/**
 * 暗号
 */
export class SecretCode {
    /** 设置暗号 */
    static setSC(_res: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        return new Promise((r) => {
            let _onlyKey = `@${Date.now()}-${Math.random().toString().replace(/^0\./, '')}`;
            this.getTime()
                .then((time) => {
                    time = time + Math.floor(performance.now());
                    (_res.headers || (_res.headers = {}))[secretCodeKey] = Base64.encode(JSON.stringify({
                        key: _onlyKey,
                        time,//后端需要比对的时间
                        v: this.confusion(`${_onlyKey}-${time}`),
                    }));
                    r(_res);
                });
        });
    }

    /** 获取后端时间的时间戳 */
    private static getTimeP: Promise<number>;
    /** 获取服务器时间 */
    public static getTime(): Promise<number> {
        if (!this.getTimeP) {
            // console.log('获取时间');
            //这里不能使用axios，应为这个方法是axios拦截里面使用的，不然会导致无限递归
            this.getTimeP = fetch(ApiTool.getWebApi(ApiConfig.apiPath.time.getTime), {
                method: 'GET',
            }).then((data) => {
                return data.json();
            }).then((data: IResData) => {
                return data.data;
            }).catch(() => {
                //如果没有获取到后端的时间戳就使用当前电脑本地的时间戳并抛出异常
                console.error('同步时间戳出错了!');
                //
                return Date.now();
            });
        }
        return this.getTimeP;
    }

    /**
     * 混淆字符串
     * @param _str 
     */
    private static confusion(_str: string): string {
        if (typeof _str !== 'string' || !_str) {
            return '';
        }
        let newStr = '';
        for (let i = 0; i < _str.length; i++) {
            newStr += String.fromCharCode(_str.charCodeAt(i) + i);
        }
        return Crypto.md5(newStr);
    }
}

//
SecretCode.getTime();