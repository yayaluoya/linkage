import { InstanceTool } from "com_utils/InstanceTool"
import { ComApiCon } from "./ComApiCon";
import { WebApiCon } from "./WebApiCon";


/**
 * 主api控制器
 */
@InstanceTool()
export class AdminApiCon extends WebApiCon {
    /** 单例 */
    static readonly instance: AdminApiCon;

    /** 根路径 */
    get _rootApi() {
        return super.rootApi.main.admin;
    }

    /** 测试 */
    test() {
        return this.getData<any>({
            url: this._rootApi.test,
        });
    }
}