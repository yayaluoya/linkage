import { BaseDataProxy } from "../BaseDataProxy";
/**
 * 测试数据
 */
export class TestDataProxy extends BaseDataProxy<{
    a: number;
    b: number;
}>{
    private static _instance: TestDataProxy;
    /** 单例 */
    static get instance(): TestDataProxy {
        if (!this._instance) {
            this._instance = new TestDataProxy();
        }
        return this._instance;
    }

    private constructor() {
        super();
    }

    protected getNewData() {
        return {
            a: 10,
            b: 20,
        };
    }
}