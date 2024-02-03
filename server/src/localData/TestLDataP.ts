import { instanceTool } from 'yayaluoya-tool/dist/instanceTool';
import { BaseDataProxy } from './BaseDataProxy';

interface D {
  s: string;
  n: number;
  obj: {
    a: string[];
    b: boolean;
  };
}

/**
 * 测试数据
 */
@instanceTool()
export class TestLDataP extends BaseDataProxy<D> {
  static readonly instance: TestLDataP;

  constructor() {
    super();
  }

  test() {
    this.data.n++;
  }

  //
  protected getNewData(): D {
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
