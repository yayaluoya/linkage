import { Module } from '@nestjs/common';
import { ComC } from './com.controller';

/**
 * 公共模块
 */
@Module({
  imports: [],
  controllers: [ComC],
})
export class ComModule {}
