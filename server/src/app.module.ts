import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'api/api.module';
import { MainConfig } from 'config/MainConfig';
import { ExceptionFilter } from 'utils/Exception/ExceptionFilter';

/**
 * app模块
 */
@Module({
  imports: [
    //数据库处理模块
    TypeOrmModule.forRoot(MainConfig.orm as any),
    /** 主模块 */
    ApiModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule {}
