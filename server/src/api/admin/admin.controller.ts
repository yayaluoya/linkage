import { Body, Controller, Get, Head, Headers, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { ResData } from "@utils/dist/ResData";

/**
 * 后台模块控制器
 */
@Controller('admin')
export class AdminC {
    @Get('test')
    test() {
        return new ResData('后台模块测试');
    }
}