import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ComVerify } from "@utils/ComVerify";

/**
 * 实体基类
 * * 每个实体类必须继承的类，包含一些公共的字段
 */
export class BaseE extends BaseEntity implements EN.IBaseE {
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

    /** 验证工具 */
    static VT = ComVerify;

    /** 验证规则 */
    static async V(_e: BaseE): Promise<string> {
        return '';
    }
}