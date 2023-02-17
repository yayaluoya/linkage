import { gzip, inflate } from "pako";
/**
 * 压缩工具
 */
export class Gzip {
    /**
     * gzip压缩
     * @param data
     */
    static gzip(data) {
        return gzip(data, { to: 'string' });
    }
    /**
     * gzip解压
     * @param data
     */
    static ungzip(data) {
        return inflate(data, {
            to: 'string'
        });
    }
}
