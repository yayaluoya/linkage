import { Request } from 'express';
import { MainConfig } from 'src/config/MainConfig';
import { Crypto } from 'src/utils/Crypto';

/** 暗号key */
const secretCodeKey = 'secret-code';
/**
 * 暗号
 */
export class SecretCode {
    /** 验证暗号 */
    static v(_req: Request): Promise<{
        /** 是否正确 */
        if: boolean;
        /** 提示消息 */
        mes: string;
    }> {
        return new Promise((r) => {
            //先判断是否验证暗号
            if (!MainConfig.ifVSecretCode) {
                r({
                    if: true,
                    mes: '',
                });
                return;
            }
            let secretCode = _req.headers[secretCodeKey] as string;
            if (!secretCode) {
                r({
                    if: false,
                    mes: '缺少暗号',
                });
            } else {
                try {
                    let { key, time, v, } = JSON.parse(Buffer.from(secretCode, 'base64').toString());
                    //先检查时间，和其他端的超时时间一致为1分钟
                    if (Math.abs(Date.now() - time) / 1000 > 60) {
                        r({
                            if: false,
                            mes: '暗号超时',
                        });
                    } else {
                        if (this.confusion(`${key}-${time}`) == v) {
                            r({
                                if: true,
                                mes: '',
                            });
                        } else {
                            r({
                                if: false,
                                mes: '无法识别的暗号',
                            });
                        }
                    }
                } catch {
                    r({
                        if: false,
                        mes: '无法识别的暗号',
                    });
                }
            }
        });
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