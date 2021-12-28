import { TestEntity } from "src/db/entities/TestEntity";
import { BaseM } from "./BaseM";
/**
 * 测试表模型
 */
export class TestM extends BaseM<TestEntity>{
    async findAll() {
        return await this._eRep.find();
    }
}