import { BaseDataProxy } from "../BaseDataProxy";
import { InstanceTool } from "@utils/InstanceTool";

interface D {
    s: string;
    n: number;
    obj: {
        a: string[];
        b: boolean;
    },
}
/**
 * 测试数据
 */
@InstanceTool()
export class TestLDataP extends BaseDataProxy<D>{
    static readonly instance: TestLDataP;
    //
    protected getDefaultData(): D {
        return {
            s: 's',
            n: 1,
            obj: {
                a: [],
                b: false,
            },
        };
    }
}