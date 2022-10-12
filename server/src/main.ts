import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { MainConfig } from './config/MainConfig';
import { PathManager } from './pathManager/PathManager';
import { cyan, yellow } from "chalk";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //
  PathManager.setStaticFileProxy(app);
  // 允许跨域
  app.enableCors();
  //
  await app.listen(MainConfig.port);
  //
  console.log(`\n${cyan(MainConfig.ZHName)} 服务已启动: ${yellow(`http://localhost:${MainConfig.port}`)}\n`);
}
bootstrap();
