import { reactive } from 'vue';
import { BaseDataProxy as BaseDataProxy_ } from 'yayaluoya-tool/dist/web/localData/BaseDataProxy';

/**
 * 基类对象代理
 */
export abstract class BaseDataProxy<D> extends BaseDataProxy_<D> {
  constructor() {
    super();
  }
  /**
   * 这里对本地的数据在包一层vue的监听
   * @param data
   * @returns
   */
  protected getLocalDataHandle(data: D) {
    return reactive(data as any);
  }
}
