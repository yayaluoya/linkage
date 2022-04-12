import { InstanceTool } from "com_utils/InstanceTool"
import { WebApiCon } from "./WebApiCon";

export interface IPixelData {
    /** 初始数据 */
    info: {
        v: number;
        range: {
            /** 起点位置 */
            p1: {
                x: number,
                y: number,
            },
            /** 终点位置 */
            p2: {
                x: number,
                y: number,
            },
        },
        /** 涉及的图片 */
        img: string,
        /** 提示语 */
        alert: string;
        /** 主题 */
        theme: string;
    },
    /** 列表数据 */
    list: Partial<EN.IPixels>[],
}

/**
 * 其它模块api控制器
 */
@InstanceTool()
export class OtherApiCon extends WebApiCon {
    /** 单例 */
    static readonly instance: OtherApiCon;

    /** 根路径 */
    get _rootApi() {
        return super.rootApi.main.other;
    }

    /** 测试 */
    test() {
        return this.getData({
            url: this._rootApi.test,
        });
    }

    /** 获取像素大战数据 */
    pixelGetData() {
        return this.getData<IPixelData>({
            url: this._rootApi.pixelGetData,
        });
    }

    /** 编辑像素大战的数据 */
    pixelEditData(data: IPixelData['info']) {
        return this.postData({
            url: this._rootApi.pixelEditData,
            data,
        });
    }

    /** 添加像素大战的数量 */
    pixelAddNumber(id: number, n: number) {
        return this.postData({
            url: this._rootApi.pixelAddNumber,
            data: {
                id,
                n,
            },
        });
    }
}