import { Body, Controller, Get, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ResData } from "src/http/ResData";
import FileDispose from "./FileDispose";
import { IFileData } from "./IFileData";

/**
 * 文件控制器
 */
@Controller('file')
export class FileController {
    /** 公共处理实例 */
    private m_fileDispose: FileDispose;
    //
    public constructor() {
        this.m_fileDispose = new FileDispose;
    }

    @Get('test')
    test() {
        return new ResData('测试')
    }

    @Post('uplode')
    @UseInterceptors(FileInterceptor('file'))
    @HttpCode(HttpStatus.OK)
    async upload(@UploadedFile() file: IFileData): Promise<ResData> {
        return this.m_fileDispose.uploadFile(file);
    }
}