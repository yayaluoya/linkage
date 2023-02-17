import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { ResData } from "global-module/dist/ResData";

/**
 * 开发模块控制器
 */
@Controller('dev')
export class DevC {
    @Get('test')
    async test() {
        return new ResData({
            mes: '开发模块测试',
        });
    }

    /** 当前内存使用情况 */
    @Get('memoryUsage')
    memoryUsage() {
        let memoryUsage = process.memoryUsage();
        return new ResData([
            {
                lable: '进程执行总内存',
                value: (memoryUsage.rss / 1024 / 1024) + 'M',
            },
            {
                lable: '堆总大小',
                value: (memoryUsage.heapTotal / 1024 / 1024) + 'M',
            },
            {
                lable: '实际使用内存',
                value: (memoryUsage.heapUsed / 1024 / 1024) + 'M',
            },
        ]);
    }
}