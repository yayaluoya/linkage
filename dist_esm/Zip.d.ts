/**
 * 压缩工具
 */
export declare class Gzip {
    /**
     * gzip压缩
     * @param data
     */
    static gzip(data: Uint8Array | string): Uint8Array;
    /**
     * gzip解压
     * @param data
     */
    static ungzip(data: Uint8Array): Uint8Array | string;
}
//# sourceMappingURL=Zip.d.ts.map