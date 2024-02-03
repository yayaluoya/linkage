import { Module } from '@nestjs/common';
import { TimeController } from './time.controller';

/**
 * 时间模块
 * 此模块不受暗号验证中间件影响
 */
@Module({
  imports: [],
  controllers: [TimeController],
  providers: [],
})
export class TimeModule {}
