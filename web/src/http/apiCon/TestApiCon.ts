import { ApiCon } from './ApiCon';
import { instanceTool } from 'yayaluoya-tool/dist/instanceTool';

/**
 * 测试api控制
 */
@instanceTool()
export class TestApiCon extends ApiCon {
  /** 单例 */
  static readonly instance: TestApiCon;

  /** 测试 get */
  testGet(params: any) {
    return this.getData({
      url: '/api/test/get',
      ['x-data-handles']: ['z', 'e'],
      params,
    });
  }

  /** 测试 post */
  testPost<T>(data: T) {
    return this.postData<T>({
      url: '/api/test/post',
      ['x-data-handles']: ['e', 'z'],
      data,
    });
  }

  /** 获取测试数据列表 */
  list() {
    return this.getData<EN.ITestE[]>({
      url: '/api/test/tab',
    });
  }
  /** 添加测试数据 */
  add(data: Partial<EN.ITestE>) {
    return this.postData<EN.ITestE>({
      url: '/api/test/tab',
      data,
    });
  }
}
