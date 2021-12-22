import { BaseEvent } from "@/base/BaseEvent";
import { createThrottleFun } from "-/throttleAntiShake";
import { ElementTransform } from "./ElementTransform";

/** 元素事件 */
type elementEvent = 'scroll';

/**
 * 元素状态基类
 * * 用来获取元素的状态，比如位置，尺寸，滚动等数据
 */
export class BaseElementState<E extends string | symbol> extends BaseEvent<E | elementEvent> {
    /** 元素 */
    private _element: HTMLElement;
    /** 元素变换 */
    private _elementTransform: ElementTransform;

    /** 获取元素 */
    get element(): HTMLElement {
        return this._element;
    }
    /** 获取元素变换 */
    get elementTransform(): ElementTransform {
        return this._elementTransform;
    }

    //
    constructor(_e: HTMLElement) {
        super();
        this._element = _e;
        this._elementTransform = new ElementTransform(this._element);
        //监听元素滚动事件
        this._element.addEventListener('scroll', createThrottleFun((e: any) => {
            this.emit('scroll', e);
        }, 50));
    }
}