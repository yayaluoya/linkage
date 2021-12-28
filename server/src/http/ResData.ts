import { HttpStatus } from '@nestjs/common';
import { Crypto } from 'src/utils/Crypto';
import { Gzip } from 'src/utils/Zip';

/** 用户token失效状态码 */
const userNoTokenStatusCode: number = 444;

/**
 * 响应数据
 */
export class ResData<D = any> implements ComN.IResData {
    timestamp: number;
    statusCode: HttpStatus;
    mes: string;
    data: D;
    ifCompress = false;
    ifEncrypt = false;
    _data: string = '';

    /**
     * 实例化
     * @param data 
     * @param statusCode 
     * @param mes 
     */
    constructor(data: D = null, statusCode: HttpStatus = HttpStatus.OK, mes: string = '') {
        this.data = data;
        this.statusCode = statusCode;
        this.mes = mes;
        //
        this.timestamp = Date.now();
    }

    /**
     * 失败
     * @param mes 消息
     * @param _code 
     * @returns 
     */
    fial(mes: string = '', _code: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR): this {
        this.data = null;
        this.statusCode = _code;
        this.mes = mes;
        return this;
    }

    /**
     * 成功
     * @param data 成功的数据
     * @param _code 
     * @returns 
     */
    com(data: D = null, _code: HttpStatus = HttpStatus.OK): this {
        this.data = data;
        this.mes = '';
        this.statusCode = _code;
        return this;
    }

    /** token没有或者失效 */
    noToken(): this {
        this.data = null;
        this.mes = '用户Token失效';
        this.statusCode = userNoTokenStatusCode;
        return this;
    }

    /** 压缩数据，作为特殊处理方法必须最后调用 */
    compress(): this {
        //此时的_data必须是一个字符串才能对其进行压缩
        if (typeof this._data != 'string') {
            this._data = this.getDataStr();
        }
        if (this.ifCompress) { return; }
        this.ifCompress = true;
        this._data = JSON.stringify(Gzip.gzip(this._data));
        //置空响应的真实数据
        this.data = null;
        return this;
    }

    /** 加密数据 */
    encrypt(): this {
        if (this.ifEncrypt) { return; }
        this.ifEncrypt = true;
        this._data = Crypto.encryptionData(this.getDataStr());
        //置空响应的真实数据
        this.data = null;
        return this;
    }

    /**
     * 获取数据的字符串格式
     * @returns 
     */
    getDataStr(): string {
        return JSON.stringify(this.data);
    }

    /**
     * 转成字符串
     */
    toString() {
        return JSON.stringify(this);
    }
}