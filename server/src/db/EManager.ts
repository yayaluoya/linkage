import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { TestEntity } from "./entities/TestEntity";
/**
 * 主体管理器
 */
export class EManager {
    /** 主体列表 */
    static get ES() {
        return [TestEntity];
    }

    /** 
     * 导入主体
     */
    static imports(es?: EntityClassOrSchema[]) {
        return TypeOrmModule.forFeature(es || this.ES);
    }
}