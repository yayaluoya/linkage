import { Body, Controller, Get, Head, Headers, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { ResData } from "@utils/dist/ResData";

/**
 * web模块控制器
 */
@Controller('web')
export class WebC {
    @Get('test')
    test() {
        return new ResData('web模块测试');
    }
}