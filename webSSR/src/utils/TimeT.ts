import moment from "moment";

/**
 * 时间工具
 */
export class TimeT {
    /**
     * 获取当前时间的标准格式字符串
     * @returns 
     */
    static getOnTime() {
        return moment().format('MMMM Do YYYY, h:mm:ss a');
    }
}