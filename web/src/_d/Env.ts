
/**
 * Env
 */
export class Env {
    /**
     * env
     */
    static get env(): ImportMetaEnv {
        return import.meta.env;
    }

    /** 是否是调试模式 */
    static get ifDev(): boolean {
        return import.meta.env.MODE == 'development';
    }

    /** 是否是生产模式 */
    static get ifPro(): boolean {
        return import.meta.env.MODE == 'production';
    }
}