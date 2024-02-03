declare namespace EN {
  /**
   * 测试表实体
   */
  export interface ITestE extends IBaseE {
    /** 数字 */
    number: number;
    /** 字符串 */
    string: string;
    /** 是否激活 */
    isActive: boolean;
    /** 测试内容 */
    cs: string;
    cs2: string;
  }
}
