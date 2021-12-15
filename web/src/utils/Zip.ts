import pako from "pako";
/**
 * 压缩工具
 */
export class Gzip {
    /**
     * gzip压缩
     * @param data 
     */
    static gzip(data: Uint8Array | string): Uint8Array {
        return pako.gzip(data, { to: 'string' });
    }
    /**
     * gzip解压
     * @param data 
     */
    static ungzip(data: Uint8Array): Uint8Array | string {
        return pako.ungzip(data);
    }
}