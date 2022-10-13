import { instanceTool } from "yayaluoya-tool/dist/instanceTool"
import { ApiCon } from "./ApiCon";


/**
 * 主api控制器
 */
@instanceTool()
export class AdminApiCon extends ApiCon {
    /** 单例 */
    static readonly instance: AdminApiCon;

    /** 测试 */
    test() {
        return this.getData<any>({
            url: '/admin/test',
        });
    }
}