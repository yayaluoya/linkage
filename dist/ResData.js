"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResData = void 0;
const ResData_1 = require("yayaluoya-tool/dist/http/ResData");
const HandleHttpData_1 = require("./HandleHttpData");
const HttpStatus_1 = require("yayaluoya-tool/dist/http/HttpStatus");
/**
 * 能处理数据的resData
 */
class ResData extends ResData_1.ResData {
    /**
     * 处理数据
     * @param handType
     * @returns
     */
    handle(handType = []) {
        return HandleHttpData_1.HandleHttpData.handle(this.toString(), handType);
    }
    /**
     * 登录失效
     */
    noLogin() {
        this.msg = '用户登录失效';
        this.status = HttpStatus_1.HttpStatus.FORBIDDEN;
        this.data = null;
        return this;
    }
    /**
     * 处理响应
     * @param res
     * @returns
     */
    static handleRes(res) {
        return new ResData(res);
    }
    /**
     * 处理错误
     * @param e
     */
    static handleError(e) {
        if (typeof e == 'object') {
            console.log('系统错误', e);
            return new ResData().fail('系统错误');
        }
        return new ResData().fail(e);
    }
}
exports.ResData = ResData;
