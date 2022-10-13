import { instanceTool } from "yayaluoya-tool/dist/instanceTool"
import { ApiCon } from "./ApiCon";

/**
 * 
 */
@instanceTool()
export class WallhavenApiCon extends ApiCon {
    /** 单例 */
    static readonly instance: WallhavenApiCon;

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
            url: '/wallhaven/page',
            params: data,
        });
    }

    /** 获取图片真实路径 */
    getImgUrl(url: string) {
        return this.getData<string>({
            url: '/wallhaven/getImgUrl',
            params: {
                url,
            },
        });
    }
}