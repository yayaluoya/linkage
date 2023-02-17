import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ResData } from "global-module/dist/ResData";
import FileDispose from "./FileDispose";
import { IFileData } from "./IFileData";

/**
 * 文件控制器
 */
@Controller('file')
export class FileController {
    /** 公共处理实例 */
    private fileDispose: FileDispose;
    //
    public constructor() {
        this.fileDispose = new FileDispose();
    }

    @Get('test')
    test() {
        return new ResData('文件模块测试')
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @HttpCode(HttpStatus.OK)
    async upload(@UploadedFile() file: IFileData): Promise<ResData> {
        return this.fileDispose.uploadFile(file);
    }

    @Post('uploadToAliOSS')
    @UseInterceptors(FileInterceptor('file'))
    @HttpCode(HttpStatus.OK)
    async uploadToAliOSS(@UploadedFile() file: IFileData): Promise<ResData> {
        return this.fileDispose.uploadToAliOSS(file);
    }

    @Delete('remove')
    async remove(@Body() body) {
        return this.fileDispose.remove(body.url);
    }
}