import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { MainConfig } from './config/MainConfig';
import { PathManager } from './pathManager/PathManager';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //
  PathManager.setStaticFileProxy(app);
  // 允许跨域
  app.enableCors();
  //
  await app.listen(MainConfig.port);
  //
  console.log(`服务已开启：http://localhost:${MainConfig.port}/`);
}
bootstrap();
