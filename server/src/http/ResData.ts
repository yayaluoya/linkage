import { HttpStatus } from '@nestjs/common';
import { HandleHttpData } from '@utils/handleHttpData';
import { Crypto_ } from 'src/utils/Crypto_';

/** 需要登录的状态码 */
const needLoginStatusCode: number = 504;

/**
 * 响应数据
 */
export class ResData<D = any> implements ComN.IResData {
    timestamp: number;
    statusCode: HttpStatus;
    mes: string;
    ['x-data-handles']: ComN.dataHandlesType[];
    data: D;

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
        this.timestamp = Date.now();
        this['x-data-handles'] = [];
    }

    /**
     * 失败数据
     * @param data 
     * @param mes 
     * @param _code 
     */
    fialData(data: any, mes: string = '', _code: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR): this {
        this.data = data;
        this.statusCode = _code;
        this.mes = mes;
        return this;
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

    /** 需要登录 */
    needLogin(): this {
        this.data = null;
        this.mes = '未登录';
        this.statusCode = needLoginStatusCode;
        return this;
    }

    /**
     * 处理数据
     * @param _type 处理类型
     * @returns 
     */
    handle(_type: ComN.dataHandlesType[]): this {
        this['x-data-handles'].push(..._type);
        this.data = HandleHttpData.handle(this.data, _type, Crypto_);
        return this;
    }

    /** 压缩数据 */
    compress(): this {
        return this.handle(['z']);
    }
    /** 加密数据 */
    encrypt(): this {
        return this.handle(['e']);
    }
    /** 混淆数据 */
    obscure(): this {
        return this.handle(['o']);
    }

    /**
     * 转成字符串
     */
    toString() {
        return JSON.stringify(this);
    }
}