import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { ResData } from "src/http/ResData";

/**
 * 公共模块控制器
 */
@Controller('com')
export class ComC {
    @Get('test')
    async test() {
        return new ResData({
            mes: '公告模块测试',
        });
    }
}