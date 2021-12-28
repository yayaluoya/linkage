import { InjectRepository } from "@nestjs/typeorm";
import { TestEntity } from "src/db/entities/TestEntity";
import { Repository } from "typeorm";
import { TestM } from "./_m/TestM";

/**
 * 表连接控制器
 * 注册了所有的实体连接
 */
export class TabRepCon {
    /**
     * 测试表实体连接
     */
    @InjectRepository(TestEntity)
    public testRep: Repository<TestEntity>;

    private m_testM: TestM;
    /** 测试表模型 */
    public get testM() {
        if (!this.m_testM) {
            this.m_testM = new TestM(this.testRep, this);
        }
        return this.m_testM;
    }
}