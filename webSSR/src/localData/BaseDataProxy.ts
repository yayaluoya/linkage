import { cleanProxyObjFun, createProxyObj, getProxyObjKey } from "com_utils/createProxyObj";
import { reactive, watch } from "vue-demi";
import { BaseEvent } from "../base/BaseEvent";
import { MainConfig } from "../config/MainConfig";
import { LocalStorage_ } from "./LocalStorage_";

/**
 * 基类本地数据代理
 */
export abstract class BaseDataProxy<D = any> extends BaseEvent {
    /** 数据 */
    private _data: D | any;
    /** 是否编辑 */
    private _ifEdit = false;
    /** 状态码 */
    private stateCode = 0;
    /** 监听器列表 */
    private watchs: {
        this: any,
        fun: Function,
        objKey: symbol,
        key: string | number | symbol,
    }[] = [];

    /** 保存的名字，默认是类名 */
    protected get name(): string {
        return `${MainConfig.Name}@${this.constructor.name}:${MainConfig.Version}`;
    }

    /** 数据 */
    get data(): D {
        return this._data;
    }
    /** 设置数据，要注意之前加的监听将会失去意义 */
    set data(_d: D) {
        if (this.data !== _d) {
            cleanProxyObjFun(this.data);//清空代理选项
            LocalStorage_.removeItem(this.name);//删除本地数据
            this.getLocalData(_d);//重置数据
        }
    }
    /** 获取一份克隆数据 */
    get cloneData(): D {
        return JSON.parse(JSON.stringify(this.data));
    }

    //
    constructor() {
        super();
        //获取一份数据
        this.getLocalData();
    }

    /**
     * 获取本地数据
     * @param _data 指定一个数据，如果不存在且本地没有数据的话则会调用获取数据的方法获取数据
     */
    private getLocalData(_data?: any) {
        let data = LocalStorage_.getItem(this.name, (s) => {
            return this.dataHandle(s, 'get');
        });
        if (!data) {
            data = _data || this.getNewData();
            LocalStorage_.setItem(this.name, data, (s) => {
                return this.dataHandle(s, 'set');
            });
        }
        //除了加一层自动保存的监听外还要加一层vue的视图更新监听
        this._data = reactive(createProxyObj(data, {
            set: (...arg) => {
                this.setBack(...arg);
            },
        }));
    }

    /** 数据修改回调 */
    private setBack(target: any, p: string | symbol, newValue: any, value: any) {
        let _objKey: symbol = getProxyObjKey(target);
        //触发监听
        this.watchs.forEach((item) => {
            if (_objKey == item.objKey && (item.key ? item.key == p : true)) {
                item.fun.call(item.this);
            }
        });
        if (this._ifEdit) { return; }
        this._ifEdit = true;
        let _stateCode: number = this.stateCode;
        //用微任务来执行保存方法
        Promise.resolve().then(() => {
            /** 状态码不一样了的话说明根数据发生了变化，此时就不用在保存之前的数据了 */
            if (_stateCode != this.stateCode) { return; }
            //
            this.save();
        });
    }


    /** 保存数据 */
    save() {
        this._ifEdit = false;
        this.stateCode++;
        LocalStorage_.setItem(this.name, this.data, (s) => {
            return this.dataHandle(s, 'set');
        });
    }

    /**
     * 监听数据更改
     * @param _this 执行域
     * @param _fun 执行方法
     * @param _obj 监听对象
     * @param _key 监听键
    */
    public MD<Obj, K extends keyof Obj>(_this: any, _fun: Function, _obj: Obj, _key: K | K[]) {
        let _objKey: symbol = getProxyObjKey(_obj);
        if (!_objKey) { return; }
        if (!Array.isArray(_key)) { _key = [_key]; }
        _key.forEach((key) => {
            this.watchs.push({
                this: _this,
                fun: _fun,
                objKey: _objKey,
                key: key as any,
            });
        });
    }
    /**
     * 监听一次数据
     * @param _this 执行域
     * @param _fun 执行方法
     * @param _obj 监听对象
     * @param _key 监听键
    */
    public onceMD<Obj, K extends keyof Obj>(_this: any, _fun: Function, _obj: Obj, _key: K | K[]) {
        let _objKey: symbol = getProxyObjKey(_obj);
        if (!_objKey) { return; }
        if (!Array.isArray(_key)) { _key = [_key]; }
        let __this = this;
        _key.forEach((key) => {
            //把_fun包装成一个执行了一次就删除掉自身的监听方法
            let __fun = function () {
                _fun.call(_this);
                __this.offMD(_this, __fun);
            }
            this.onceMD(_this, __fun, _obj, key);
        });
    }
    /**
     * 取消监听数据
     * @param _this 执行域
     * @param _fun 执行方法
     */
    public offMD(_this: any, _fun: Function | undefined = undefined) {
        this.watchs = this.watchs.filter((item) => {
            return !(item.this == _this && (_fun ? item.fun == _fun : true));
        });
    }

    /** 获取一份新数据 */
    protected abstract getNewData(): D | null;
    /** 数据处理，可以在数据被获取和设置前做加密解密操作 */
    protected dataHandle(str: string, type: 'get' | 'set'): string {
        return str;
    }
}