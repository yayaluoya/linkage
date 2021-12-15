import { MainConfig } from "src/config/MainConfig";
import { cleanProxyObjFun, createProxyObj } from "@utils/createProxyObj";
import { LocalStorage_ } from "./_/LocalStorage_";

/**
 * 基类本地数据代理
 */
export abstract class BaseDataProxy<Data extends object = any> {
    /** 数据 */
    private _data: Data;

    /** 是否改动了数据 */
    private _ifEditData: boolean = false;
    /** 数据保存序号 */
    private _saveNumber: number = 0;

    /** 保存时的名字，继承以覆盖 */
    protected get key(): string {
        return this.constructor.name;
    }
    /** 保存时的版本，继承以覆盖 */
    protected get v(): string {
        return MainConfig.Version;
    }
    /** 保存时用的组合名字 */
    private get _key(): string {
        return `${MainConfig.Name}-${this.key}@${this.v}`;
    }

    /** 获取数据 */
    public get data(): Data {
        return this._data;
    }
    /** 设置数据 */
    public set data(_data: Data) {
        if (this._data == _data) {
            return;
        } else {
            //清除旧数据的监听
            cleanProxyObjFun(_data);
            //设置数据
            LocalStorage_.setItem(this._key, _data);
            //重新获取数据
            this.getData();
        }
    }

    //
    constructor() {
        //默认获取数据
        this.getData();
    }

    /** 获取数据 */
    private getData() {
        let _data: Data = LocalStorage_.getItem(this._key);
        if (!_data) {
            _data = this.getDefaultData();
            //设置一次数据
            LocalStorage_.setItem(this._key, _data);
        }
        this._data = createProxyObj(_data, {
            set: () => {
                if (this._ifEditData) { return; }
                this._ifEditData = true;
                let _editNumber = this._saveNumber;
                Promise.resolve().then(() => {
                    _editNumber == this._saveNumber && this.saveData();
                });
            },
        });
    }

    /** 保存数据 */
    saveData() {
        //递增数据保存序号
        this._saveNumber++;
        this._ifEditData = false;
        //保存数据
        LocalStorage_.setItem(this._key, this._data);
    }

    /** 获取默认数据 */
    protected abstract getDefaultData(): Data;
}