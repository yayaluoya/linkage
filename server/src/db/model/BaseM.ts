import { BaseEntity, Repository } from "typeorm";

/**
 * 基类模型类
 * 继承此类可以直接获取到某个表的连接
 * TODO 相当于是处理表
 */
export class BaseM<E extends BaseEntity>{
    /** 实体连接 */
    protected _eRep: Repository<E>;

    constructor(_eRep: Repository<E>) {
        this._eRep = _eRep;
    }

    /**
     * 补全数据
     * 主要补全和其它表的关联数据
     * TODO 只能补全自身缺少的属性
     * @param _e 
     */
    protected async completionData(_e: E): Promise<E> {
        return _e;
    }
}