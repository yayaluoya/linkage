import { BaseEntity } from "typeorm";

/**
 * 基类模型类
 * TODO 每个模型就是一个模块，在其它模块可以直接通过依赖注入的形式引用，相当于是处理表
 */
export class BaseM<E extends BaseEntity>{
    //
}