import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { ResData } from "@utils/ResData";
import { HeaderDataHandlePack } from "utils/MethodDecorator/HeaderDataHandlePack";

@Controller('test')
export class TestController {

    /** get */
    @Get('get')
    @HeaderDataHandlePack(['e'])
    async get(@Query() query: any) {
        return new ResData(query).handle(['e']);
    }

    /** post */
    @Post('post')
    @HttpCode(HttpStatus.OK)
    post(@Body() body): ResData {
        return new ResData(body);
    }
}