import { Crypto } from "yayaluoya-tool/dist/Crypto";
import { instanceTool } from "yayaluoya-tool/dist/instanceTool";

/**
 * 加密用工具实例
 */
@instanceTool()
export class CryptoI extends Crypto {
    static readonly instance: CryptoI;

    constructor() {
        super('asdfwerfasdfsdfasdfqwerqwerqweqw', 'fasdfasdfasdfasd');
    }
}