import { Module } from '@nestjs/common';
import { FileController } from './file.controller';

/**
 * 文件模块
 */
@Module({
    imports: [],
    controllers: [FileController],
    providers: [],
})
export class FileModule {}
