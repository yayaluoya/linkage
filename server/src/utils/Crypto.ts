import { createCipheriv, createDecipheriv, createHash } from "crypto";

/**
 * 加解密工具
 */
export class Crypto {
    private static key = 'abcdefg123456789abcdefg123456789';
    private static iv = 'abcdefg123456789';

    /**
     * md5
     * @param _str 字符串
     */
    static md5(_str: string): string {
        return createHash('md5').update(_str).digest('hex').toString();
    }

    /**
     * 加密数据
     * @param _str 原字符串
     */
    static encryptionData(_str: string): string {
        let _crypto = createCipheriv('aes-256-cbc', this.key, this.iv);
        _crypto.update(_str, 'utf8', 'hex');
        return _crypto.final('hex').toString();
    }

    /**
     * 解密数据
     * @param _str 原字符串
     */
    static decryptionData(_str: string): string {
        let _cdecipher = createDecipheriv('aes-256-cbc', this.key, this.iv);
        _cdecipher.update(_str, 'hex', 'utf8');
        return _cdecipher.final().toString();
    }
}