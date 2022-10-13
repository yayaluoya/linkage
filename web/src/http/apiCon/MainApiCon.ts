import { instanceTool } from "yayaluoya-tool/dist/instanceTool"
import { ApiCon } from "./ApiCon";

/**
 * 主api控制器
 */
@instanceTool()
export class MainApiCon extends ApiCon {
    /** 单例 */
    static readonly instance: MainApiCon;
}