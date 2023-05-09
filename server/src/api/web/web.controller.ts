import {
    Body,
    Controller,
    Get,
    Head,
    Headers,
    HttpCode,
    HttpStatus,
    Post,
    Query,
} from '@nestjs/common';
import { ResData } from 'global-module/dist/ResData';

/**
 * web模块控制器
 */
@Controller('/api/web')
export class WebC {
    @Get('test')
    test() {
        return new ResData('web模块测试');
    }
}
