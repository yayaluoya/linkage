import moment from "moment";

/**
 * 时间工具
 */
export class TimeT {
    /**
     * 格式
     * TODO 可重写
     */
    static get format() {
        return 'YYYY-MM-DD HH:mm:ss';
    }

    /**
     * 获取时间
     * @param op 
     * @returns 
     */
    static getTime(op: moment.MomentInput) {
        return moment(op).format(this.format);
    }

    /**
     * 获取当前时间的标准格式字符串
     * @returns 
     */
    static getOnTime() {
        return this.getTime(undefined);
    }
}