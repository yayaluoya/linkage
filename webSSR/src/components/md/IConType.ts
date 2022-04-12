/** 
 * 控制器子类型
 */
interface IConItemKey {
    [key: string]: any;
    /** 快捷键 */
    ak?: string;
    /** 点击事件 */
    onClick?: Function;
    /** 点击别的元素的点击事件，只要点击的控制器不是自己，就会在自己身上触发这个事件 */
    noClick?: Function;
    /** icon */
    icon?: string,
    /** 提示用的title */
    alertTitle?: string;
    /** 是否显示选择器 */
    showSelect?: boolean,
    /** 选择回调 */
    selectBack?: Function,
}

/** 
 * 控制器类型
 */
export interface IConType {
    /** 主题 */
    theme: IConItemKey;
    /** 粗体 */
    boldface: IConItemKey;
    /** 斜体 */
    italic: IConItemKey;
    /** 标题 */
    title: IConItemKey;
    /** 链接 */
    url: IConItemKey;
    /** 图片 */
    img: IConItemKey;
    /** 表情 */
    emoji: IConItemKey;
    /** 无序列表 */
    uList: IConItemKey;
    /** 有序列表 */
    oList: IConItemKey;
    /** 表格 */
    table: IConItemKey;
    /** 代码 */
    code: IConItemKey;
    /** 引用 */
    use: IConItemKey;
    /** 查看 */
    show: IConItemKey;
    /** 帮助 */
    help: IConItemKey;
}