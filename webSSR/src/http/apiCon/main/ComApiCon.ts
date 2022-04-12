import { InstanceTool } from "com_utils/InstanceTool"
import { WebApiCon } from "./WebApiCon";
import { entitiestoUtf16, utf16toEntities } from "@/utils/Emoji";

/**
 * 主api控制器
 */
@InstanceTool()
export class ComApiCon extends WebApiCon {
    /** 单例 */
    static readonly instance: ComApiCon;

    /** 根路径 */
    get _rootApi() {
        return super.rootApi.main.com;
    }

    /** 测试 */
    test() {
        return this.getData<any>({
            url: this._rootApi.test,
        });
    }
    /** 获取md帮助信息 */
    getMdHelp() {
        return this.getCache(this._rootApi.getMdHelp, () => {
            return this.requestData<string>({
                url: this._rootApi.getMdHelp,
            });
        });
    }
    /** 获取emoji列表 */
    getEmoji() {
        return this.getCache(this._rootApi.getEmoji, () => {
            return this.getData<string>({
                url: this._rootApi.getEmoji,
            }).then((str) => {
                return JSON.parse(str).map((item: any) => {
                    item.list = [...utf16toEntities(item.list).matchAll(/&#[0-9]+;/g)].map((_) => {
                        return entitiestoUtf16(_[0]);
                    });
                    return item;
                }) as {
                    title: string;
                    list: string[];
                }[];
            });
        });
    }
}