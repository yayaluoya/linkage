import { Entity, Column } from 'typeorm';
import { BaseE } from '../BaseE';

@Entity('test')
export class TestEntity extends BaseE implements EN.ITestE {
  static get TableName(): string {
    return 'test';
  }

  @Column({
    type: 'bigint',
  })
  number: number;

  @Column()
  string: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column()
  cs: string;

  @Column()
  cs2: string;
}
