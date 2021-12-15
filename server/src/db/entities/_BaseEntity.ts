import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * 实体基类
 * * 每个实体类必须继承的类，包含一些公共的字段
 */
export class _BaseEntity extends BaseEntity implements EN.IBaseE {
    /** id */
    @PrimaryGeneratedColumn()
    id: number;

    /** 数据创建时间 */
    @Column({
        type: 'bigint',
        default: 0,
    })
    createTime: number;

    /** 逻辑是否删除 */
    @Column({
        default: false,
    })
    delete: boolean;
}