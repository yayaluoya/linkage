import { Module } from '@nestjs/common';
import { AdminC } from './admin.controller';

/**
 * 后台模块
 */
@Module({
  imports: [],
  controllers: [AdminC],
})
export class AdminModule {}
