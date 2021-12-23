import { HttpStatus } from "com_utils/HttpStatus";

/**
 * 响应数据类型
 */
export interface IResData<Data = any, Res = any> extends ComN.IResData<HttpStatus, Data> {
    /** 原响应 */
    res: Res;
}