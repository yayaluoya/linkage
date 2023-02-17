import { BaseEvent } from 'yayaluoya-tool/dist/BaseEvent';
import { instanceTool } from 'yayaluoya-tool/dist/instanceTool';
import { createThrottleFun } from 'yayaluoya-tool/dist/throttleAntiShake';

/**
 * 屏幕滚动事件管理器
 */
@instanceTool()
export class ScrollE extends BaseEvent<'scroll'> {
    /** 单例 */
    static readonly instance: ScrollE;

    constructor() {
        super();
        let f = createThrottleFun(() => {
            this.emit('scroll', document.documentElement.scrollTop);
        }, 30);
        window.addEventListener('scroll', f);
    }
}
