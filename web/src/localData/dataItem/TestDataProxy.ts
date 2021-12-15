import { InstanceTool } from "com_utils/InstanceTool";
import { BaseDataProxy } from "../BaseDataProxy";
/**
 * 测试数据
 */
@InstanceTool()
export class TestDataProxy extends BaseDataProxy<{
    a: number;
    b: number;
}>{
    /** 单例 */
    static instance: TestDataProxy;

    constructor() {
        super();
        setInterval(() => {
            this.data.a++;
        }, 100);
    }

    protected getNewData() {
        return {
            a: 10,
            b: 20,
        };
    }
}