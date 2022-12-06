import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { MainConfig } from './config/MainConfig';
import { PathManager } from './pathManager/PathManager';
import { cyan, yellow } from "chalk";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //
  app.useStaticAssets(PathManager.publicFilePath, {
    prefix: PathManager.publicFilePrefix,
    maxAge: MainConfig.server.publicFileMaxAge,
  });
  // 允许跨域
  app.enableCors();
  //
  await app.listen(MainConfig.server.port);
  //
  console.log(`\n${cyan(MainConfig.ZHName)} 服务已启动: ${yellow(`http://localhost:${MainConfig.server.port}`)}\n`);
}
bootstrap();
