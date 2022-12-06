import { Request } from 'express';
import { MainConfig } from 'config/MainConfig';
import { confusionStr } from '@utils/dist/confusionStr';
import { SecretCoduDataP } from 'localData/SecretCoduDataP';

/**
 * 暗号验证
 * @param _req 请求
 * @returns 
 */
export function secretCodeV(_req: Request): Promise<string> {
    return new Promise((r) => {
        // 先判断是否验证暗号
        if (!MainConfig.server.secretCode.v) {
            r('');
            return;
        }
        // 获取暗号
        let secretCode = ((_req.headers || {} as any) as ComN.IReqHead)['x-secret-code'];
        if (!secretCode) {
            r('缺少暗号');
        } else {
            try {
                let { key, time, v, } = JSON.parse(Buffer.from(secretCode, 'base64').toString());
                //先检查时间
                if (Math.abs(Date.now() - time) > MainConfig.server.secretCode.overrunTime) {
                    r('暗号过期');
                } else {
                    //再检查暗号真实性
                    if (confusionStr(`${key}-${time}`) == v) {
                        //再检查暗号是否过期
                        if (!SecretCoduDataP.instance.vBeOverdue(v, time)) {
                            r('');
                        } else {
                            r('该暗号已被使用');
                        }
                    } else {
                        r('无法识别的暗号');
                    }
                }
            } catch {
                r('无法识别的暗号');
            }
        }
    });
}