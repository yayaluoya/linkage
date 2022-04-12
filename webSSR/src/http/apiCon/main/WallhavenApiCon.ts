import { InstanceTool } from "com_utils/InstanceTool"
import { WebApiCon } from "./WebApiCon";

/**
 * 
 */
@InstanceTool()
export class WallhavenApiCon extends WebApiCon {
    /** 单例 */
    static readonly instance: WallhavenApiCon;

    /** 根路径 */
    get _rootApi() {
        return super.rootApi.main.wallhaven;
    }

    /** 分页查询 */
    page(data: {
        /** 类型 */
        type: string,
        /** 页数 */
        page: number,
    }) {
        return this.getData<{
            list: {
                /** 缩略图地址 */
                thumbnailUrl: string;
                /** 详情地址 */
                detailsUrl: string;
            }[]
            length: number
            /** 类型 */
            type: string
            /** 页数 */
            page: number
        }>({
            url: this._rootApi.page,
            params: data,
        });
    }

    /** 获取图片真实路径 */
    getImgUrl(url: string) {
        return this.getData<string>({
            url: this._rootApi.getImgUrl,
            params: {
                url,
            },
        });
    }
}