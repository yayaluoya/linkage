import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { ResData } from "src/http/ResData";

@Controller('test')
export class TestController {

    /** get */
    @Get('get')
    async get(@Query() query: any) {
        return new ResData(query).compress().encrypt();
    }

    /** post */
    @Post('post')
    @HttpCode(HttpStatus.OK)
    post(@Body() body): ResData {
        return new ResData(body);
    }
}