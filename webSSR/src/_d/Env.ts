
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

    /** 是否是ssr端 */
    static get ifSSR(): boolean {
        return this.env.SSR;
    }

    /** 是否在服务端 */
    static get ifS(): boolean {
        return this.env.SSR;
    }

    /** 是否在客户端 */
    static get ifC(): boolean {
        return !this.env.SSR;
    }

    /** 是否是调试模式 */
    static get ifDev(): boolean {
        return this.env.MODE == 'development';
    }

    /** 是否是生产模式 */
    static get ifPro(): boolean {
        return this.env.MODE == 'production';
    }
}