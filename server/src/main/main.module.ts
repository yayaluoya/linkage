import { Module } from '@nestjs/common';
import { AdminM } from './admin/admin.module';
import { ComM } from './com/com.module';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { WallhavenM } from './wallhaven/wallhaven.module';

/**
 * 主模块
 */
@Module({
  imports: [
    //引入其他api模块
    ComM,
    AdminM,
    WallhavenM,
  ],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule { }
