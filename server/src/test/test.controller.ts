import { Controller, Get, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TestEntity } from "src/db/entities/TestEntity";
import { WXApiCon } from "src/http/apiCon/WXApiCon";
import { ResData } from "src/http/ResData";
import { TestLDataP } from "src/localData/item/TestLDataP";
import { Repository } from "typeorm";

@Controller('test')
export class TestController {
    /** 测试表 */
    @InjectRepository(TestEntity)
    private testRepository: Repository<TestEntity>

    /** get */
    @Get('get')
    async get(@Query() query: any) {
        return new ResData(query).encrypt().compress();
    }

    @Get('testLData')
    testLData(): ResData {
        TestLDataP.instance.data.n++;
        TestLDataP.instance.data.obj.a.push(TestLDataP.instance.data.obj.a.length + '');
        return new ResData('测试本地数据');
    }

    /** post */
    @Post('post')
    @HttpCode(HttpStatus.OK)
    post(): ResData {
        return new ResData('post测试1111111');
    }

    /** 数据库查询 */
    @Get('db_get')
    async db_get(): Promise<ResData> {
        let text = await this.testRepository.findOne();
        return new ResData(text);
    }

    /** 数据库新增 */
    @Post('db_post')
    @HttpCode(HttpStatus.OK)
    async db_post(): Promise<ResData> {
        let text = new TestEntity();
        text.string = '测试';
        text.number = 10;
        text.cs = 'cs';
        text.cs2 = 'cs';
        await this.testRepository.save(text);
        return new ResData();
    }
}