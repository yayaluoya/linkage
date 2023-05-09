import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { ResData } from 'global-module/dist/ResData';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * 处理时长的拦截器
 */
@Injectable()
export class ProcessingTimeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        let time = Date.now();
        return next.handle().pipe(
            map((data) => {
                if (data instanceof ResData) {
                    // 添加处理时长字段
                    data.handleTime = Date.now() - time;
                }
                return data;
            }),
        );
    }
}
