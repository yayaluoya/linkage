import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { TestEntity } from './entities/TestEntity';
/**
 * 主体管理器
 */
export class EManager {
  /**
   * 所有主体列表
   * TODO 一般不要用
   */
  static get AllES() {
    return [TestEntity];
  }

  /**
   * 导入主体
   */
  static imports(...es: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(es);
  }
}
