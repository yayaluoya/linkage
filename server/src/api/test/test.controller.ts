import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { ResData } from "global-module/dist/ResData";
import { TestM } from "db/model/TestM";
import { HeaderDataHandlePack } from "utils/MethodDecorator/HeaderDataHandlePack";
import { CryptoI } from "global-module/dist/CryptoI";

@Controller('/api/test')
export class TestController {
    constructor(
        private testM: TestM
    ) { }

    /** get */
    @Get('get')
    @HeaderDataHandlePack(['e'])
    async get(@Query() query: any) {
        return new ResData(query).handle(['e']);
    }

    @Get('error')
    async error() {
        throw '报错了';
    }

    /** post */
    @Post('post')
    @HttpCode(HttpStatus.OK)
    post(@Body() body) {
        return new Promise((r) => {
            setTimeout(() => {
                r(new ResData(body));
            }, 500);
        });
    }

    @Get('tab')
    async tab() {
        // console.log('获取列表');
        return new ResData(await this.testM.findAll());
    }
    @Post('tab')
    async addTab(@Body() body) {
        return new ResData(await this.testM.add(body));
    }

    @Get('md5')
    md5() {
        return new ResData(CryptoI.md5(Date.now().toString()));
    }
}