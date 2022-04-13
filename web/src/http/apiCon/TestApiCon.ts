import { InstanceTool } from "com_utils/InstanceTool"
import { AxiosRequestConfig } from "axios";
import { ApiConfig } from "../ApiConfig";
import { ApiCon } from "./ApiCon";

/**
 * 测试api控制
 */
@InstanceTool()
export class TestApiCon extends ApiCon {
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
    testGet(params: any) {
        return this.getData({
            url: this._rootApi.get,
            ['x-data-handles']: ['z', 'e'],
            params,
        });
    }

    /** 测试 post */
    testPost(data: any) {
        return this.postData({
            url: this._rootApi.post,
            ['x-data-handles']: ['e', 'z'],
            data,
        });
    }
}