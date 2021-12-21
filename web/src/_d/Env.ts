/**
 * Env
 */
export class Env {
    /**
     * 是否是调试模式
     */
    static get ifDev(): boolean {
        return import.meta.env.MODE == 'development';
    }
}