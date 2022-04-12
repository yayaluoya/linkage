import { InstanceTool } from "com_utils/InstanceTool";


/**
 * 用户事件管理器
*/
@InstanceTool()
export class TestEvent extends BaseEvent<string> {
    /** 单例 */
    static readonly instance: TestEvent;
}