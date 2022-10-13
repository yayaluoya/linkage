import { AxiosRequestConfig } from "axios";
import { ApiCon } from "./ApiCon";
import { instanceTool } from "yayaluoya-tool/dist/instanceTool"

/**
 * 测试api控制
 */
@instanceTool()
export class TestApiCon extends ApiCon {
    /** 单例 */
    static readonly instance: TestApiCon;

    /** 测试 get */
    testGet(params: any) {
        return this.getData({
            url: '/test/get',
            ['x-data-handles']: ['z', 'e'],
            params,
        });
    }

    /** 测试 post */
    testPost(data: any) {
        return this.postData({
            url: '/test/post',
            ['x-data-handles']: ['e', 'z'],
            data,
        });
    }
}