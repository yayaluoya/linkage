import { Request } from 'express';
import { MainConfig } from 'config/MainConfig';
import { confusionStr } from '@utils/confusionStr';
import { SecretCoduDataP } from 'localData/SecretCoduDataP';

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
            let secretCode = ((_req.headers || {} as any) as ComN.IReqHead)['x-secret-code'];
            if (!secretCode) {
                r({
                    if: false,
                    mes: '缺少暗号',
                });
            } else {
                try {
                    let { key, time, v, } = JSON.parse(Buffer.from(secretCode, 'base64').toString());
                    //先检查时间
                    if (Math.abs(Date.now() - time) > SecretCoduDataP.instance.overrunTime) {
                        r({
                            if: false,
                            mes: '暗号过期',
                        });
                    } else {
                        //再检查暗号真实性
                        if (confusionStr(`${key}-${time}`) == v) {
                            //再检查暗号是否过期
                            if (!SecretCoduDataP.instance.vBeOverdue(v, time)) {
                                r({
                                    if: true,
                                    mes: '',
                                });
                            } else {
                                r({
                                    if: false,
                                    mes: '该暗号已被使用',
                                });
                            }
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
}