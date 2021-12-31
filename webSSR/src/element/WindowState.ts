import { InstanceTool } from "com_utils/InstanceTool";
import { createThrottleFun } from "-/throttleAntiShake";
import { BaseElementState } from "./BaseElementState";

type eventType = 'resize';

/**
 * Window的状态
 */
@InstanceTool()
export class WindowState extends BaseElementState<eventType> {
    /** 单例 */
    static instance: WindowState;

    //
    constructor() {
        super(document.documentElement);
        //给documentElement绑定的滚动事件会不生效，这里重新绑定下，同时清空默认绑定的滚动事件
        this.off('scroll');
        window.addEventListener('scroll', createThrottleFun((e: any) => {
            this.emit('scroll', e);
        }, 50));
        //添加滚动事件
        window.addEventListener('resize', () => {
            this.emit('resize');
        });
    }
}