import { ApiConfig } from "../ApiConfig";
import { BaseApiCon, IBaseApiOp } from "../BaseApiCon";

/**
 * 测试api控制
 */
export class TestApiCon extends BaseApiCon {
    static get op(): IBaseApiOp {
        return {
            baseUrl: ApiConfig.domainPath.web,
        };
    }

    /** 根路径 */
    static get _rootApi() {
        return super.rootApi.test;
    }

    /** 测试 get */
    static testGet() {
        return this.getData(this._rootApi.get);
    }

    /** 测试 post */
    static testPost() {
        return this.postData(this._rootApi.post);
    }
}