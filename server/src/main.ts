import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { MainConfig } from './config/MainConfig';
import { PathManager } from './pathManager/PathManager';
import { cyan, yellow } from 'chalk';
import { ExceptionFilter } from 'utils/Exception/ExceptionFilter';
import { HttpStatus } from 'yayaluoya-tool/dist/http/HttpStatus';
import * as mime from 'mime';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    /**
     * web文件代理
     */
    let webIndex = 'index.html';
    app.useStaticAssets(PathManager.webDistPath, {
        prefix: '/',
        index: webIndex,
        maxAge: MainConfig.publicFileMaxAge,
        setHeaders(res: Response, path) {
            if (path == join(PathManager.webDistPath, webIndex)) {
                res.setHeader('Cache-Control', 'no-cache');
            }
        },
    });
    /**
     * 添加404异常的处理
     * 当接口404时返回代理的web主页面
     */
    ExceptionFilter.addResHandle((res, resData, next) => {
        if (resData.status == HttpStatus.NOT_FOUND) {
            if (
                statSync(join(PathManager.webDistPath, webIndex), {
                    throwIfNoEntry: false,
                })?.isFile()
            ) {
                res.writeHead(HttpStatus.OK, {
                    'Content-Type': mime.getType('.html'),
                    'Cache-Control': 'no-cache',
                });
                createReadStream(join(PathManager.webDistPath, webIndex)).pipe(res);
            } else {
                next();
            }
        } else {
            next();
        }
    });
    //public文件代理
    app.useStaticAssets(PathManager.publicFilePath, {
        prefix: PathManager.publicFilePrefix,
        maxAge: MainConfig.publicFileMaxAge,
    });
    // 允许跨域
    app.enableCors();
    //
    await app.listen(MainConfig.port);
    //
    console.log(
        `\n${cyan(MainConfig.ZHName)} 服务已启动: ${yellow(
            `http://localhost:${MainConfig.port}`,
        )}\n`,
    );
}
bootstrap();
