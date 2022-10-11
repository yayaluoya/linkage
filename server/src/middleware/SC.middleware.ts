import { HttpException, HttpStatus, Injectable, NestMiddleware, RequestMethod } from "@nestjs/common";
import { NextFunction } from "express";
import { Request, Response } from 'express';
import { ResData } from "@utils/ResData";
import { SecretCode } from "./SecretCode";

/**
 * 暗号中间件
 */
@Injectable()
export class SCMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        //验证暗号
        SecretCode.v(req)
            .then((data) => {
                if (data.if) {
                    next();
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8',
                    });
                    res.end(new ResData(undefined, HttpStatus.FORBIDDEN, data.mes).toString());
                }
            });
    }
}