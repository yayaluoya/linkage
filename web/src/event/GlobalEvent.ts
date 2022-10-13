import { BaseEvent } from "yayaluoya-tool/dist/BaseEvent";
import { instanceTool } from "yayaluoya-tool/dist/instanceTool";


/**
 * 全局事件管理器
*/
@instanceTool()
export class GlobalEvent extends BaseEvent<string> {
    /** 单例 */
    static readonly instance: GlobalEvent;
}