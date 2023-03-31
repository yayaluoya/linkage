import { ExceptionFilter as ExceptionFilter_, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResData } from "global-module/dist/ResData";
import { HttpStatus } from 'yayaluoya-tool/dist/http/HttpStatus';
import { red } from "chalk";

/**
 * 异常过滤
 */
@Catch()
export class ExceptionFilter implements ExceptionFilter_ {
    private static handResList: ((res: Response, resData: ResData, next: Function) => void)[] = [];

    /** 添加res处理 */
    static addResHandle(f: (res: Response, resData: ResData, next: Function) => void) {
        this.handResList.push(f);
    }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException
            ? exception.message
            : (console.log(red('服务器错误❌'), exception), '服务器错误❌，错误内容请查看日志');

        let resData = new ResData(null, status, message);
        resData.handleTime = Date.now();

        // res处理列表
        let handResList = [
            ...ExceptionFilter.handResList,
            (res) => {
                resData.handleTime = Date.now() - resData.handleTime;
                res
                    .status(HttpStatus.OK)
                    .json(resData);
            }
        ];

        let handleRes = () => {
            let hf = handResList.shift();
            if (hf) {
                hf(response, resData, handleRes);
            }
        }
        handleRes();
    }
}