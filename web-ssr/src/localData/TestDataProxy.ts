import { instanceTool } from 'yayaluoya-tool/dist/instanceTool';
import { BaseDataProxy } from './BaseDataProxy';

/**
 * 测试数据
 */
@instanceTool()
export class TestDataProxy extends BaseDataProxy<{
  a: number;
  b: number;
}> {
  /** 单例 */
  static instance: TestDataProxy;

  constructor() {
    super();
    setInterval(() => {
      this.data.a++;
    }, 1000);
  }

  protected getNewData() {
    return {
      a: 10,
      b: 20,
    };
  }
}
