import CryptoJS from 'crypto-js';

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
        let srcs = CryptoJS.enc.Utf8.parse(_str);
        return CryptoJS.MD5(srcs).toString();
    }

    /**
     * 加密数据
     * @param _str 原字符串
     */
    static encryptionData(_str: string): string {
        let srcs = CryptoJS.enc.Utf8.parse(_str);
        let key = CryptoJS.enc.Utf8.parse(this.key);
        let iv = CryptoJS.enc.Utf8.parse(this.iv);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        //转成hex格式的
        return encrypted.ciphertext.toString();
    }

    /**
     * 解密数据
     * @param _str 原字符串
     */
    static decryptionData(_str: string): string {
        let encryptedHexStr = CryptoJS.enc.Hex.parse(_str);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let key = CryptoJS.enc.Utf8.parse(this.key);
        let iv = CryptoJS.enc.Utf8.parse(this.iv);
        let decrypt = CryptoJS.AES.decrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
}