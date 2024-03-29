/// <reference path = "./test.d.ts"/>

/**
 * 数据库实体命名空间
 * 所有的数据库实体数据类型都源于这里
 */
declare namespace EN {
  /**
   * 基类实体
   */
  export interface IBaseE {
    /** id */
    id: number;
    /** 数据创建时间 */
    createTime: number;
    /** 逻辑是否删除 */
    delete: boolean;
  }
}
