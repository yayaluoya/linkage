import { Entity, Column } from 'typeorm';
import { _BaseEntity } from './_BaseEntity';

@Entity('test')
export class TestEntity extends _BaseEntity implements EN.ITestE {
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
}
