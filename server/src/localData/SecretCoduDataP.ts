import { MainConfig } from "config/MainConfig";
import { instanceTool } from "yayaluoya-tool/dist/instanceTool";
import { BaseDataProxy } from "./BaseDataProxy";

type D = [string, number][];

/**
 * 暗号本地数据
 */
@instanceTool()
export class SecretCoduDataP extends BaseDataProxy<D> {
    static readonly instance: SecretCoduDataP;
    //
    protected getNewData() {
        return [];
    }

    /**
     * 暗号是否过期
     * @param v 
     * @param time 
     */
    vBeOverdue(v: string, time: number): boolean {
        //先剔除掉超时的暗号
        this.data = this.data.filter((item) => {
            return Math.abs(item[1] - Date.now()) <= MainConfig.secretCode.overrunTime;
        });
        if (this.data.some((item) => {
            return item[0] == v;
        })) {
            return true;
        } else {
            this.data.push([v, time]);
            return false;
        }
    }
}