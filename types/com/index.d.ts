/// <reference path = "./dataPage.d.ts"/>

/**
 * 公共命名空间
 */
declare namespace ComN {
  /**
   * 数据处理类型
   * * z 压缩
   * * e 加密
   * * o 混淆
   */
  export type dataHandlesType = 'z' | 'e' | 'o';

  /**
   * 数据处理
   */
  export interface IDataHandle {
    /** 数据处理列表，z表示压缩，e表示加密，o表示混淆 */
    'x-data-handles'?: dataHandlesType[];
  }

  /**
   * 请求头
   */
  export interface IReqHead extends IDataHandle {
    /** 用户的token */
    'x-token': string;
    /** 后端接口需要验证的暗号 */
    'x-secret-code': string;
  }
}
