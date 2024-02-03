import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  RequestMethod,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { Request, Response } from 'express';

/**
 * api中间件
 */
@Injectable()
export class ApiMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('api', req.baseUrl, req.ip, req.method);
    next();
  }
}
