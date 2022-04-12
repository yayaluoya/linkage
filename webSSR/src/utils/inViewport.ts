/**
 * 监听一个元素第一次进入视图
 * TODO 注意事项：
 * 被监听的元素默认大小如果是0（就是有一边长度为0）的话就触发不了事件，因为大小是0的元素就已经是一个不显示的范畴了
 */
export function inViewport_(_el: Element): boolean;
export function inViewport_(_el: Element, _op?: {
    container?: Element;
    offset?: number;
    debounce?: number;
    failsafe?: boolean;
}, _back?: Function): {
    /** 重新监听 */
    watch: Function;
    /** 停止监听 */
    dispose: Function;
};
export function inViewport_(_el: any, _op?: any, _back?: any) {
    try {
        return inViewport(_el, _op, _back);
    } catch (e) {
        console.error(e);
        return {};
    }
}