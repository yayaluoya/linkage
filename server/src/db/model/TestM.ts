import { Module } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EManager } from "db/EManager";
import { TestEntity } from "db/entities/TestEntity";
import { Repository } from "typeorm";
import { BaseM } from "../BaseM";
/**
 * 测试表模型
 */
@Module({
    imports: [EManager.imports(TestEntity)],
    exports: [TestM],
})
export class TestM extends BaseM<TestEntity>{
    constructor(
        @InjectRepository(TestEntity)
        private rep: Repository<TestEntity>
    ) {
        super();
    }

    async findAll() {
        return await this.rep.createQueryBuilder().getMany();
    }

    async add(data: Partial<TestEntity>) {
        let item = new TestEntity();
        for (let i in data) {
            item[i] = data[i];
        }
        return await this.rep.save(item);
    }
}