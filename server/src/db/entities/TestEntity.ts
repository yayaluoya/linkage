import { Entity, Column } from 'typeorm';
import { BaseE } from '../BaseE';

@Entity('test')
export class TestEntity extends BaseE implements EN.ITestE {
    @Column()
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

    /** 验证规则 */
    static async V(_e: TestEntity): Promise<string> {
        return '';
    }
}
