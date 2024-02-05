import { ResData as ResData_ } from 'yayaluoya-tool/dist/http/ResData';
import { HandleHttpData } from './HandleHttpData';
import { HttpStatus } from 'yayaluoya-tool/dist/http/HttpStatus';

/**
 * 能处理数据的resData
 */
export class ResData<D = any> extends ResData_<D> {
  /** 处理时长(ms) */
  handleTime: number;

  /**
   * 处理数据
   * @param handType
   * @returns
   */
  handle(handType: ComN.dataHandlesType[] = []) {
    return HandleHttpData.handle(this.toString(), handType);
  }

  /**
   * 登录失效
   */
  noLogin() {
    this.msg = '用户登录失效';
    this.status = HttpStatus.FORBIDDEN;
    this.data = null;
    return this;
  }

  /**
   * 处理响应
   * @param res
   * @returns
   */
  static handleRes(res) {
    return new ResData(res);
  }

  /**
   * 处理错误
   * @param e
   */
  static handleError(e) {
    if (typeof e == 'object') {
      console.log('系统错误', e);
      return new ResData().fail('系统错误');
    }
    return new ResData().fail(e);
  }
}
