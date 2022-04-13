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

    /** 获取sts的key */
    stsServer() {
        type t = {
            accessKeyId: string;
            accessKeySecret: string;
            stsToken: string;
            timeout: number;
        };
        return this.getData<t>({
            url: this._rootApi.stsServer,
        }).catch(({ mes }) => {
            console.error('获取aliOSS临时访问key出错了', mes);
            return {} as t;
        });;
    }
}