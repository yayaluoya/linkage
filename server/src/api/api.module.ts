import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { DataHandleMiddleware } from 'middleware/DataHandle.middleware';
import { SCMiddleware } from 'middleware/SC.middleware';
import { PathManager } from 'pathManager/PathManager';
import { FileModule } from './file/file.module';
import { TimeModule } from './time/time.module';
import { AdminModule } from './admin/admin.module';
import { ComModule } from './com/com.module';
import { TestModule } from './test/test.module';
import { WebModule } from './web/web.module';

/**
 * 主模块
 */
@Module({
  imports: [
    AdminModule,
    ComModule,
    FileModule,
    TestModule,
    TimeModule,
    WebModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer) {
    //添加暗号验证中间件
    consumer.apply(SCMiddleware)
      .exclude(
        //排除时间模块
        { path: 'time/(.*)', method: RequestMethod.GET },
        //这里必须把静态文件的路由去掉
        { path: `${PathManager.publicFilePrefix}(.*)`, method: RequestMethod.GET },
      )
      // 匹配全部请求
      .forRoutes('*');
    //添加数据处理中间件
    consumer.apply(DataHandleMiddleware).forRoutes('*');
  }
}
