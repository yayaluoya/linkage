import { ApiConfig } from "../ApiConfig";
import { BaseApiCon, IBaseApiOp } from "../BaseApiCon";
/**
 * 主api控制器
 */
export class MainApiCon extends BaseApiCon {
    static get op(): IBaseApiOp {
        return {
            baseUrl: ApiConfig.domainPath.web,
        };
    }

    /** 根路径 */
    static get _rootApi() {
        return super.rootApi.main;
    }
}