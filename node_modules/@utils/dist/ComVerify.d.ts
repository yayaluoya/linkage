/**
 * 公共验证
 */
export declare class ComVerify {
    /**
     * 颜色验证
     * @param _str
     * @param _title
     * @returns
     */
    static colorV(_str: string, _title: string): string;
    /**
     * 长度验证
     * @param _str
     * @param _g
     * @param _title
     */
    static lengthV(_str: string, _g: [number, number], _title: string): string;
    /**
     *
     * @param _str 路径验证
     */
    static urlV(_str: string): string;
}
//# sourceMappingURL=ComVerify.d.ts.map