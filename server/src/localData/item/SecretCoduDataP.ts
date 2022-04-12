import { BaseDataProxy } from "../BaseDataProxy";
import { InstanceTool } from "@utils/InstanceTool";

type D = [string, number][];

/**
 * 暗号本地数据
 */
@InstanceTool()
export class SecretCoduDataP extends BaseDataProxy<D> {
    static readonly instance: SecretCoduDataP;
    //
    protected getDefaultData() {
        return [];
    }

    /** 超时时间 */
    readonly overrunTime = 60 * 1000;

    /**
     * 监测暗号是否过期
     * @param v 
     * @param time 
     */
    vBeOverdue(v: string, time: number): boolean {
        //先剔除掉超时的暗号
        this.data = this.data.filter((item) => {
            return Math.abs(item[1] - Date.now()) <= this.overrunTime;
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