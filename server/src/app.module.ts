import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db/dbConfig';
import { FileModule } from './file/file.module';
import { MainModule } from './main/main.module';
import { DataHandleMiddleware } from './middleware/DataHandle.middleware';
import { SCMiddleware } from './middleware/SC.middleware';
import { PathManager } from './pathManager/PathManager';
import { TestModule } from './test/test.module';
import { TimeModule } from './time/time.module';

/**
 * app模块
 */
@Module({
  imports: [
    //数据库处理模块
    TypeOrmModule.forRoot(dbConfig),
    /** 主模块 */
    MainModule,
    /** 时间模块 */
    TimeModule,
    /** 文件模块 */
    FileModule,
    /** 测试模块 */
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    //添加暗号验证中间件
    consumer.apply(SCMiddleware)
      .exclude(
        //排除时间模块
        { path: 'time/(.*)', method: RequestMethod.GET },
        //排除测试模块
        { path: 'test/(.*)', method: RequestMethod.GET },
        //这里必须把静态文件的路由去掉
        { path: `${PathManager.publicFilePrefix}(.*)`, method: RequestMethod.GET },
      )
      // 匹配全部请求
      .forRoutes('*');
    //添加数据处理中间件
    consumer.apply(DataHandleMiddleware).forRoutes('*');
  }
}
