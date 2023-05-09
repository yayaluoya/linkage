import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { FileModule } from './file/file.module';
import { TimeModule } from './time/time.module';
import { AdminModule } from './admin/admin.module';
import { ComModule } from './com/com.module';
import { TestModule } from './test/test.module';
import { WebModule } from './web/web.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ProcessingTimeInterceptor } from './_interceptor/ProcessingTime.interceptor';
import { DevModule } from './dev/dev.module';
import { SCMiddleware } from './_middleware/SC.middleware';
import { ApiMiddleware } from './_middleware/Api.middleware';
import { DataHandleMiddleware } from './_middleware/DataHandle.middleware';

/**
 * 主模块
 */
@Module({
    imports: [
        AdminModule,
        ComModule,
        DevModule,
        FileModule,
        TestModule,
        TimeModule,
        WebModule,
    ],
    controllers: [ApiController],
    providers: [
        ApiService,
        {
            provide: APP_INTERCEPTOR,
            useClass: ProcessingTimeInterceptor,
        },
    ],
})
export class ApiModule {
    configure(consumer: MiddlewareConsumer) {
        // api中间件
        consumer.apply(ApiMiddleware).forRoutes('/api/*');
        //
        let forRoutes = [
            '/api/admin/*',
            '/api/com/*',
            '/api/file/*',
            '/api/web/*',
            '/api/test/*',
        ];
        //添加暗号验证中间件
        consumer.apply(SCMiddleware).forRoutes(...forRoutes);
        //添加数据处理中间件
        consumer.apply(DataHandleMiddleware).forRoutes(...forRoutes);
    }
}
