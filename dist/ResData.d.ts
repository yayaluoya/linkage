import { ResData as ResData_ } from "yayaluoya-tool/dist/http/ResData";
/**
 * 能处理数据的resData
 */
export declare class ResData<D = any> extends ResData_<D> {
    /** 处理时长-ms */
    handleTime: number;
    /**
     * 处理数据
     * @param handType
     * @returns
     */
    handle(handType?: ComN.dataHandlesType[]): string;
    /**
     * 登录失效
     */
    noLogin(): this;
    /**
     * 处理响应
     * @param res
     * @returns
     */
    static handleRes(res: any): ResData<any>;
    /**
     * 处理错误
     * @param e
     */
    static handleError(e: any): ResData<any>;
}
//# sourceMappingURL=ResData.d.ts.map