import { HttpException, HttpStatus, Injectable, NestMiddleware, RequestMethod } from "@nestjs/common";
import { NextFunction } from "express";
import { Request, Response } from 'express';
import { HandleHttpData } from "@utils/handleHttpData"
import { Crypto_ } from "src/utils/Crypto_";

/**
 * 数据处理中间件
 */
@Injectable()
export class DataHandleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        let data_handles = [];
        try {
            data_handles = JSON.parse(((req.headers || {} as any) as ComN.IReqHead)['x-data-handles'] as any);
        }
        catch { }
        if (data_handles.length > 0) {
            if (req.body) {
                req.body = HandleHttpData.handle_(req.body.data, data_handles, Crypto_);
            }
            if (req.query) {
                for (let i in req.query) {
                    req.query[i] = HandleHttpData.handle_(req.query[i], data_handles, Crypto_);
                }
            }
        }
        next();
    }
}