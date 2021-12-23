import { InstanceTool } from "com_utils/InstanceTool"
import { AxiosRequestConfig } from "axios";
import { ApiConfig } from "../ApiConfig";
import { ApiCon_ } from "./ApiCon_";

/**
 * 主api控制器
 */
@InstanceTool()
export class MainApiCon extends ApiCon_ {
    /** 单例 */
    static readonly instance: MainApiCon;
    /**  */
    protected get op(): AxiosRequestConfig {
        return {
            baseURL: ApiConfig.domainPath.web,
        };
    }

    /** 根路径 */
    get _rootApi() {
        return super.rootApi.main;
    }
}