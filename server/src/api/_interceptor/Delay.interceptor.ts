import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

/**
 * 延时拦截器
 */
@Injectable()
export class DelayInterceptor implements NestInterceptor {
  constructor(private time = 0) {}
  intercept(context: ExecutionContext, next: CallHandler) {
    return new Promise<any>((r) => {
      setTimeout(() => {
        r(next.handle());
      }, this.time);
    });
  }
}
