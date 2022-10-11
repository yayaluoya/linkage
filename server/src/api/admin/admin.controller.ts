import { Body, Controller, Get, Head, Headers, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { ResData } from "@utils/ResData";

/**
 * 后台模块控制器
 */
@Controller('admin')
export class AdminC {
    @Get('test')
    test() {
        return new ResData('后台模块测试');
    }

    @Get('stsServer')
    async stsServer() {
        // return AliOssT.stsServer().then((info) => {
        //     return new ResData(info);
        // }).catch((e) => {
        //     return new ResData().fialData(e);
        // })
    }
}