import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResData } from "@utils/dist/ResData";
import { TestEntity } from "db/entities/TestEntity";
import { TestM } from "db/model/TestM";
import { Repository } from "typeorm";
import { HeaderDataHandlePack } from "utils/MethodDecorator/HeaderDataHandlePack";
import { CryptoI } from "@utils/dist/CryptoI";

@Controller('test')
export class TestController {
    private testM: TestM;

    constructor(
        @InjectRepository(TestEntity)
        testRepository: Repository<TestEntity>
    ) {
        this.testM = new TestM(testRepository);
    }

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