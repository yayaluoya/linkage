import { HttpStatus } from '@nestjs/common';

/**
 * 响应数据
 */
export class ResData<D = any> {
    /** 响应时间戳 */
    timestamp: number;
    /** 响应状态码 */
    statusCode: HttpStatus;
    /** 附带消息 */
    mes: string;
    /** 实体数据 */
    data: D;
    /** 其它字段 */
    [index: string]: any;

    /**
     * 实例化
     * @param data 
     * @param statusCode 
     * @param mes 
     */
    constructor(data: any = null, statusCode: HttpStatus = HttpStatus.OK, mes: string = '') {
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
    com(data: any = null, _code: HttpStatus = HttpStatus.OK): this {
        this.data = data;
        this.mes = '';
        this.statusCode = _code;
        return this;
    }

    /** token没有或者失效 */
    noToken(): this {
        this.data = null;
        this.mes = 'Token失效';
        this.statusCode = 444;
        return this;
    }

    /**
     * 转成字符串
     */
    toString() {
        return JSON.stringify(this);
    }
}