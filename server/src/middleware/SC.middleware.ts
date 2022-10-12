import { HttpException, Injectable, NestMiddleware, RequestMethod } from "@nestjs/common";
import { NextFunction } from "express";
import { Request, Response } from 'express';
import { ResData } from "@utils/ResData";
import { secretCodeV } from "./secretCodeV";
import { HttpStatus } from "yayaluoya-tool/dist/http/HttpStatus";

/**
 * 暗号中间件
 */
@Injectable()
export class SCMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        secretCodeV(req)
            .then((mes) => {
                if (!mes) {
                    next();
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8',
                    });
                    res.end(new ResData(null, HttpStatus.BAD_REQUEST, mes).toString());
                }
            });
    }
}