import { InstanceTool } from "com_utils/InstanceTool"
import { AxiosRequestConfig } from "axios";
import { ApiConfig } from "../ApiConfig";
import { ApiCon_ } from "./ApiCon_";

/**
 * 测试api控制
 */
@InstanceTool()
export class TestApiCon extends ApiCon_ {
    /** 单例 */
    static readonly instance: TestApiCon;

    /**  */
    protected get op(): AxiosRequestConfig {
        return {
            baseURL: ApiConfig.domainPath.web,
        };
    }

    /** 根路径 */
    get _rootApi() {
        return super.rootApi.test;
    }

    /** 测试 get */
    testGet() {
        return this.getData({
            url: this._rootApi.get,
        });
    }

    /** 测试 post */
    testPost() {
        return this.postData({
            url: this._rootApi.post,
        });
    }
}