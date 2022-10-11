import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from 'api/api.module';
const typeormConfig = require("../config/typeormConfig");

/**
 * app模块
 */
@Module({
  imports: [
    //数据库处理模块
    TypeOrmModule.forRoot(typeormConfig),
    /** 主模块 */
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
