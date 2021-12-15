import { TypeOrmModule } from "@nestjs/typeorm";
import { TestEntity } from "./entities/TestEntity";
/**
 * 主体管理器
 */
export class EManager {
    /** 主体列表 */
    static get ES() {
        return [TestEntity];
    }

    /** 导入所有主体 */
    static get imports() {
        return TypeOrmModule.forFeature(this.ES);
    }
}