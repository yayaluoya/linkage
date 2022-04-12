import { BaseDataProxy } from "../BaseDataProxy";
import { InstanceTool } from "com_utils/InstanceTool";

/**
 * 像素大战数据代理
 * 主要用来限制像素大战的参与与取消参与
 */
@InstanceTool()
export class PixelDP extends BaseDataProxy<{
    /** 参与列表 */
    pis: {
        v: number;
        id: number;
    }[];
}> {

    protected getNewData() {
        return {
            pis: [],
        };
    }

    /** 单例 */
    static instance: PixelDP;

    /** 获取参与id的列表 */
    getPis(v: number): number[] {
        return this.data.pis.filter(_ => _.v == v).map(_ => _.id);
    }

    /** 添加参与id */
    add(v: number, id: number) {
        let index = this.data.pis.findIndex(_ => _.v == v && _.id == id);
        if (index == -1) {
            this.data.pis.push({
                v,
                id,
            });
        }
    }
    /** 取消参与 */
    off(v: number, id: number) {
        let index = this.data.pis.findIndex(_ => _.v == v && _.id == id);
        if (index != -1) {
            this.data.pis.splice(index, 1);
        }
    }
}