import { TestEntity } from "db/entities/TestEntity";
import { BaseM } from "./BaseM";
/**
 * 测试表模型
 */
export class TestM extends BaseM<TestEntity>{
    async findAll() {
        return await this._eRep.find();
    }

    async add(data: Partial<TestEntity>) {
        let item = new TestEntity();
        for (let i in data) {
            item[i] = data[i];
        }
        return await this._eRep.save(item);
    }
}