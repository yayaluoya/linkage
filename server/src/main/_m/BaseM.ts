import { BaseEntity, Repository } from "typeorm";
import { TabRepCon } from "../TabRepCon";

/**
 * 基类模型类
 * 继承此类可以直接获取到某个表的连接，也可以间接获取到所有表的连接
 */
export class BaseM<E extends BaseEntity>{
    /** 实体连接 */
    protected _eRep: Repository<E>;
    /** 父节点，从这里可以拿到所有表连接 */
    protected _parent: TabRepCon;

    constructor(_eRep: Repository<E>, _parent?: TabRepCon) {
        this._eRep = _eRep;
        this._parent = _parent;
    }

    /**
     * 补全数据
     * 主要补全和其它表的关联数据
     * 只能补全自身缺少的属性
     * @param _e 
     */
    protected async completionData(_e: E): Promise<E> {
        return _e;
    }
}