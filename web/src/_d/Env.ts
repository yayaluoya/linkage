/**
 * Env
 * 不要尝试吧import.meta.env保存起来，它是直接静态替换的，并不是动态注入的
 */
export class Env {
    /** 是否是调试模式 */
    static get ifDev(): boolean {
        return import.meta.env.MODE == 'development';
    }

    /** 是否是生产模式 */
    static get ifPro(): boolean {
        return import.meta.env.MODE == 'production';
    }

    /** 调试模式 */
    static get DEV(): boolean {
        return import.meta.env.DEV;
    }

    /** 生产模式 */
    static get PROD(): boolean {
        return import.meta.env.PROD;
    }
}
