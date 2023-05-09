import { BaseEvent } from 'yayaluoya-tool/dist/BaseEvent';
import { instanceTool } from 'yayaluoya-tool/dist/instanceTool';

/**
 * 案件按下事件管理器
 */
@instanceTool()
export class KeydownE extends BaseEvent<'keydown'> {
    /** 单例 */
    static readonly instance: KeydownE;

    constructor() {
        super();
        window.addEventListener('keydown', (e) => {
            this.emit('keydown', e);
        });
    }
}
