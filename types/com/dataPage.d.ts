declare namespace ComN {
  /**
   * 分页数据
   */
  export interface IPageData<T = any> {
    list: T[];
    length: number;
  }
  /**
   * 分页数据类型
   */
  export interface IPageQuery<Q = any> {
    /** 分页大小 */
    size: number;
    /** 第几页 */
    page: number;
    /** 查询条件 */
    query?: Q;
  }
}
