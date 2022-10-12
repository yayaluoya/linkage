import { instanceTool } from "yayaluoya-tool/dist/instanceTool";
import cheerio from "cheerio";
import { BaseApiCon } from "./BaseApiCon";
import { type AxiosRequestConfig } from "axios";

/** api列表 */
const ApiList = {
    /** 分页查询 */
    pageQuery: '/{type}',
};

/**
 * wh图片库api控制器
 */
@instanceTool()
export class WHApiCon extends BaseApiCon {
    static readonly instance: WHApiCon;

    protected get op(): AxiosRequestConfig {
        return {
            baseURL: 'https://wallhaven.cc',
        };
    }

    /**
     * 分页查询
     */
    pageQuery(_op: {
        /** 类型 */
        type: string,
        /** 页数 */
        page: number,
    }) {

        type D = {
            /** 缩略图地址 */
            thumbnailUrl: string;
            /** 详情地址 */
            detailsUrl: string;
        };

        return this.get({
            url: ApiList.pageQuery.replace(/{type}/, _op.type),
            params: {
                page: _op.page,
            },
        }).then(({ data }) => {
            //
            let _list: D[] = [];
            let $ = cheerio.load(data);
            let thumbList = $('.thumb');
            for (let o of thumbList) {
                _list.push({
                    thumbnailUrl: $('>img', o).attr('data-src'),
                    detailsUrl: $('>a', o).attr('href'),
                });
            }
            //提取图片地址
            return _list;
        }).catch(() => {
            return [];
        }) as Promise<D[]>;
    }

    /**
     * 获取图片真实路径
     * @param _url 
     */
    getImgUrl(_url: string) {
        return this.get({
            url: _url,
        }).then(({ data }) => {
            let $ = cheerio.load(data);
            return $('#wallpaper').attr('src');
        });
    }
}