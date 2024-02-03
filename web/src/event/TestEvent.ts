import { BaseEvent } from 'yayaluoya-tool/dist/BaseEvent';
import { instanceTool } from 'yayaluoya-tool/dist/instanceTool';

/**
 * test事件管理器
 */
@instanceTool()
export class TestEvent extends BaseEvent<string> {
  /** 单例 */
  static readonly instance: TestEvent;
}
