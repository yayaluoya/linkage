import { Body, Controller, Get, Header, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResData } from "@utils/ResData";
import { TestEntity } from "db/entities/TestEntity";
import { TestM } from "db/model/TestM";
import { Repository } from "typeorm";
import { HeaderDataHandlePack } from "utils/MethodDecorator/HeaderDataHandlePack";

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
    post(@Body() body): ResData {
        return new ResData(body);
    }

    @Get('tab')
    async tab() {
        return this.testM.findAll();
    }
    @Post('tab')
    async addTab() {
        return this.testM.add();
    }
}