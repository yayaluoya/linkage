import { Request } from 'express';
import { MainConfig } from 'config/MainConfig';
import { confusionStr } from 'global-module/dist/confusionStr';
import { instanceTool } from 'yayaluoya-tool/dist/instanceTool';

/**
 * 暗号工具
 * 主要在内存中缓存当前在时间段内使用的暗号列表
 */
@instanceTool()
export class SecretCodeT {
    static readonly instance: SecretCodeT;
    /** 暗号列表 */
    private list: Map<string, number> = new Map();

    constructor() {
        // 定时清除过期暗号
        setInterval(() => {
            for (let [v, time] of this.list.entries()) {
                if (Math.abs(time - Date.now()) > MainConfig.secretCode.overrunTime) {
                    this.list.delete(v);
                }
            }
        }, MainConfig.secretCode.overrunTime / 3);
    }

    /**
     * 暗号是否能使用
     * @param v
     * @param time
     */
    ifUse(v: string, time: number): boolean {
        if (this.list.has(v)) {
            return false;
        } else {
            this.list.set(v, time);
            return true;
        }
    }
}

/**
 * 暗号验证
 * @param _req 请求
 * @returns
 */
export function secretCodeV(_req: Request): Promise<string> {
    return new Promise((r) => {
        // 先判断是否验证暗号
        if (!MainConfig.secretCode.v) {
            r('');
            return;
        }
        // 获取暗号
        let secretCode = ((_req.headers || ({} as any)) as ComN.IReqHead)[
            'x-secret-code'
        ];
        if (!secretCode) {
            r('缺少暗号');
        } else {
            try {
                let { key, time, v } = JSON.parse(
                    Buffer.from(secretCode, 'base64').toString(),
                );
                //先检查时间
                if (Math.abs(Date.now() - time) > MainConfig.secretCode.overrunTime) {
                    r('暗号过期');
                } else {
                    //再检查暗号真实性
                    if (confusionStr(`${key}-${time}`) == v) {
                        //再检查暗号是否过期
                        if (SecretCodeT.instance.ifUse(v, time)) {
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
