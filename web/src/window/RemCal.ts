import { BaseEvent } from "@/base/BaseEvent";
import { WindowState } from "@/element/WindowState";
import { Vector2 } from "-/Vector2";
/**
 * rem计算工具
 */
export class RemCal extends BaseEvent {
    /** 是否开始 */
    private static _ifStart = false;
    /** 1rem对呀的多少px */
    private static _rem = 0;
    /** 默认rem */
    private static _defaultRem = 75;
    /** 默认宽度 */
    private static _defaultWidth = 1220;

    private static _set: any;

    static get ifStart() {
        return this._ifStart;
    }
    static get rem() {
        return this._rem;
    }

    /**
     * 开始计算
     */
    static start() {
        if (this._ifStart) { return; }
        this._ifStart = true;
        //
        this._set = () => {
            this.set();
        }
        this.set();
        WindowState.instance.on('resize', this, this._set);
    }

    //设置
    private static set() {
        let _windowV2: Vector2 = new Vector2(window.innerWidth, window.innerHeight);
        if (_windowV2.x > this._defaultWidth) {
            this._rem = this._defaultRem;
        } else {
            this._rem = (_windowV2.x / this._defaultWidth) * this._defaultRem;
        }
        document.documentElement.style.setProperty('font-size', this._rem + 'px');
    }

    /**
     * 结束计算
     */
    static stop() {
        if (!this.ifStart) { return; }
        this._ifStart = false;
        WindowState.instance.off('resize', this, this._set);
    }
}