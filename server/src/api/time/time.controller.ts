import { Controller, Get } from '@nestjs/common';
import { ResData } from 'global-module/dist/ResData';

/**
 * 时间相关，用来获取服务端的当前时间戳api
 */
@Controller('/api/time')
export class TimeController {
    @Get()
    get() {
        return this.getTime();
    }
    @Get('getTime')
    getTime_(): ResData {
        return this.getTime();
    }

    /**
     * 获取时间
     * @returns
     */
    getTime() {
        return new ResData(Date.now());
    }
}
