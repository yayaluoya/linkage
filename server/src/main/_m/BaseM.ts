import { BaseEntity, Repository } from "typeorm";
import { TabRepCon } from "../TabRepCon";

/**
 * 基类模型类
 */
export class BaseM<E extends Repository<BaseEntity>>{
    /** 实体连接 */
    protected _eRep: E;
    /** 父节点 */
    protected _parent: TabRepCon;

    constructor(_eRep: E, _parent) {
        this._eRep = _eRep;
        this._parent = _parent;
    }

    /**
     * 补全数据
     * 主要补全和其它表的关联数据
     * @param _e 
     * @returns 
     */
    async completionData(_e: BaseEntity): Promise<BaseEntity> {
        return _e;
    }
}