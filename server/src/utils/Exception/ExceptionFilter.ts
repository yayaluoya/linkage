import { ExceptionFilter as ExceptionFilter_, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResData } from "@utils/ResData";
import { HttpStatus } from 'yayaluoya-tool/dist/http/HttpStatus';
import { red } from "chalk";

/**
 * 异常过滤
 */
@Catch()
export class ExceptionFilter implements ExceptionFilter_ {
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
            : (console.log(red('服务器内部错误'), exception), '服务器内部错误');

        response
            .status(200)
            .json(new ResData(null, status, message));
    }
}