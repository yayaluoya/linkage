import { ElMessage, MessageOptions } from "element-plus";
import { ResData } from "global-module/dist_esm/ResData";

/**
 * 消息提示工具
 */
export class Mes {
    /**
     * 成功提示
     * @param _str 
     */
    static success(_str: string) {
        ElMessage.success(_str);
    }
    /**
     * 警告提示
     * @param _str 
     */
    static warning(_str: string) {
        ElMessage.warning(_str);
    }
    /**
     * info提示
     * @param _str 
     */
    static info(_str: string) {
        ElMessage.info(_str);
    }
    /**
     * 异常提示
     * @param _str 
     */
    static error(_str: string) {
        ElMessage.error(_str);
    }

    /** 处理http的错误请求提示 */
    static handleHttpCatch(res: ResData) {
        console.error('请求错误', res);
        Mes.error(res.msg);
    }

    /** 提示http的错误请求提示 */
    static alertHttpCatch(res: ResData) {
        console.error('请求错误', res);
        Mes.error(res.msg);
        throw res;
    }

    /** 处理表单异常 */
    static handleFormCatch(e: any) {
        console.warn('表单验证失败', e);
    }
}