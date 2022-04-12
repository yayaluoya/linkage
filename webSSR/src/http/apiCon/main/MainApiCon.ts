import { InstanceTool } from "com_utils/InstanceTool"
import { WebApiCon } from "./WebApiCon";

/**
 * 主api控制器
 */
@InstanceTool()
export class MainApiCon extends WebApiCon {
    /** 单例 */
    static readonly instance: MainApiCon;

    /** 根路径 */
    get _rootApi() {
        return super.rootApi.main.main;
    }
}