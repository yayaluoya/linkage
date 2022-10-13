import { Vector2 } from "yayaluoya-tool/dist/Vector2";
import anime from 'animejs/lib/anime.js';
import { EEasing } from "@/_d/EEasing";

/**
 * 元素变换
 */
export class ElementTransform {
    /** 元素 */
    private _element: HTMLElement;
    /** 父变换 */
    private _parentTransform?: ElementTransform;
    /** 位置 */
    private _pos: Vector2 = new Vector2();
    /** 尺寸 */
    private _size: Vector2 = new Vector2();
    /** 滚动条信息 */
    private _scrollInfo: {
        /** 内容大小 */
        size: Vector2;
        /** 滚动位置 */
        pos: Vector2;
        /** 反向滚动位置 */
        _pos: Vector2;
    } = {
            size: new Vector2(),
            pos: new Vector2(),
            _pos: new Vector2(),
        };

    /** 获取元素 */
    get element(): HTMLElement {
        return this._element;
    }
    /** 获取父变换 */
    get parentTransform(): ElementTransform | null {
        if (!this._parentTransform) {
            if (!this._element.parentElement) {
                return null;
            }
            this._parentTransform = new ElementTransform(this._element.parentElement);
        }
        return this._parentTransform;
    }
    /** 获取位置 */
    get pos() {
        let _rect = this._element.getBoundingClientRect();
        this._pos.setValue(_rect.x, _rect.y);
        return this._pos;
    }
    /** 获取尺寸 */
    get size() {
        let _rect = this._element.getBoundingClientRect();
        this._size.setValue(_rect.width, _rect.height);
        return this._size;
    }
    /** 获取滚动条信息 */
    get scrollInfo() {
        let _rect = this._element.getBoundingClientRect();
        //设置滚动相关数据
        this._scrollInfo.size.setValue(this._element.scrollWidth, this._element.scrollHeight);//滚动尺寸
        this._scrollInfo.pos.setValue(this._element.scrollLeft, this._element.scrollTop);//滚动位置
        this._scrollInfo._pos.setValue(
            this._element.scrollWidth - this._element.scrollLeft - _rect.width,
            this._element.scrollHeight - this._element.scrollTop - _rect.height,
        );//反向滚动位置
        return this._scrollInfo;
    }

    /**
     * 初始化
     * @param pos 位置
     * @param size 尺寸
     */
    constructor(_e: HTMLElement) {
        this._element = _e;
    }

    /**
     * 是否在顶部
     * @param _offset 偏差位置
     */
    ifTop(_offset = 0): boolean {
        return this.scrollInfo.pos.y <= _offset;
    }
    /**
     * 是否在底部
     * @param _offset 偏差位置
     */
    ifBottom(_offset = 0): boolean {
        return this.scrollInfo._pos.y <= _offset;
    }
    /**
     * 是否在左边
     * @param _offset 偏差位置
     */
    ifLeft(_offset = 0): boolean {
        return this.scrollInfo.pos.x <= _offset;
    }
    /**
     * 是否在右边
     * @param _offset 偏差位置
     */
    ifRight(_offset = 0): boolean {
        return this.scrollInfo._pos.x <= _offset;
    }

    /** 滚动到指定位置 */
    scrollTo(x?: number, y?: number, duration: number = 100) {
        if (typeof x == 'number' || typeof y == 'number') {
            //先删除掉上一个动画    
            anime.remove(this._element);
        }
        if (typeof x == 'number') {
            anime({
                targets: this._element,
                scrollLeft: x,
                duration,
                easing: EEasing.easeInQuad,
            });
        }
        if (typeof y == 'number') {
            anime({
                targets: this._element,
                scrollTop: y,
                duration,
                easing: EEasing.easeInQuad,
            });
        }
    }
}