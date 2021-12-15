import { Module } from '@nestjs/common';
import { ComM } from './com/com.module';
import { MainController } from './main.controller';
import { MainService } from './main.service';

/**
 * 主模块
 */
@Module({
  imports: [
    //引入其他api模块
    ComM,
  ],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule { }
