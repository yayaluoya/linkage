import { HttpStatus } from "com_utils/HttpStatus";

/**
 * 响应数据类型
 */
export interface IResData<Data = any, Res = any> {
    /** 原响应 */
    res: Res;
    /** 响应时间戳 */
    timestamp: number;
    /** 响应状态码 */
    statusCode: HttpStatus;
    /** 附带消息 */
    mes: string;
    /** 实体数据 */
    data: Data;
}