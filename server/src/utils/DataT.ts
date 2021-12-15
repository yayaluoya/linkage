import { sep } from "path";

/**
 * 数据工具
 */
export class DataT {
    /**
     * 整理url
     * @param _s  
     * @returns 
     */
    static finishingUrl(_s: string): string {
        //主要是对window平台的路径分隔符进行替换
        return _s.replace(/\\+/g, '/');
    }
}