/** 
 * 对一些npm库的声明
*/

declare module '@kangc/*' {
    const obj: any;
    export default obj;
}

declare module 'animejs/*' {
    export interface IAnimeOp {
        [key: string]: any;
        /** 目标元素 */
        targets: string | Element | object;
        /** 时间曲线 */
        easing?: string | Function;
        /** 动画持续时间 */
        duration?: number;
        /** 动画延迟 */
        delay?: number;
        /** 在动画结束时以毫秒为单位添加一些额外时间 */
        endDelay?: number;
        /** 数字格式 */
        round?: number;
        /** 定义动画的方向 */
        direction?: 'normal' | 'reverse' | 'alternate';
        /** 循环，如果为true则为无限循环 */
        loop?: number | true;
        /** 自动播放 */
        autoplay?: boolean;
        /** 关键帧 */
        keyframes?: any[];
        /** 动画开始播放后，每帧都会触发此回调 */
        update?: (ani: any) => any;
        /** 当动画开始播放时 */
        begin?: (ani: any) => any;
        /** 动画完成后 */
        complete?: (ani: any) => any;
        /** 每次循环开始时都会触发一次 */
        loopBegin?: (ani: any) => any;
        /** 每次循环结束时，就会触发一次 */
        loopComplete?: (ani: any) => any;
        /** 在动画的delay和endDelay之间的每个帧上触发此回调 */
        change?: (ani: any) => any;
        /** 每次动画改变开始时都会触发 */
        changeBegin?: (ani: any) => any;
        /** 每次动画改变结束时都会触发 */
        changeComplete?: (ani: any) => any;
    }
    /** 动画实例 */
    interface IAnimeItem {
        /** 播放 */
        play(): void;
        /** 暂停 */
        pause(): void;
        /** 重新播放 */
        restart(): void;
        /** 反转方向 */
        reverse(): void;
        /** 瞬移 */
        seek(_time: number): void;
    }
    interface IAnime {
        (_op: IAnimeOp): IAnimeItem;
        /** 删除动画 */
        remove(target: IAnimeOp['targets']): void;
        /** 获取动画原始值 */
        get(target: IAnimeOp['targets'], propertyName: string, unit: string): any;
        /** 获取动画原始值 */
        set(target: IAnimeOp['targets'], property: Record<string, any>): void;
        /** 获取一个范围内的随机值 */
        random(minValue: number, maxValue: number): number;
        /** 时间轴 */
        timeline(_op: IAnimeOp): any;
    }
    const anime: IAnime;
    export default anime;
}

declare module 'prismjs' {
    const obj: any;
    export default obj;
}

declare module 'marked' {
    /**
     * 选项配置
     */
    export interface IOp {
        /** 任何相对链接的前缀 */
        baseUrl?: string;
        /** 如果为 true，则在单个换行符上添加 <br>（复制 GitHub 评论中的行为，但不复制呈现的降价文件）。要求 gfm 为真 */
        breaks?: boolean;
        /** 如果为 true，请使用已批准的 GitHub Flavored Markdown (GFM) 规范 */
        gfm?: boolean;
        /** 如果为 true，则在发出标题（h1、h2、h3 等）时包含 id 属性。 */
        headerIds?: boolean;
        /** 发出标题（h1、h2、h3 等）时用于 id 属性前缀的字符串。 */
        headerPrefix?: string;
        /** 高亮代码块的函数，见异步高亮 */
        highlight?: Function;
        /** 在 \<code\> 块中作为 className 前缀的字符串。对语法高亮很有用。 */
        langPrefix?: string;
        /** 如果为 true，自动链接的电子邮件地址将使用 HTML 字符引用进行转义。 */
        mangle?: boolean;
        /** 如果为true，则尽可能符合原始markdown.pl。不要修复原始降价错误或行为。关闭并覆盖 gfm。 */
        pedantic?: boolean;
        /** 包含将标记呈现为 HTML 的函数的对象。有关更多详细信息，请参阅可扩展性。 */
        renderer?: marked.Renderer;
        /** 
         * 如果为 true，则使用 sanitizer 函数清理传递给 markdownString 的 HTML。
         * 警告：此功能已弃用，不应使用，因为它不能被视为安全。
         * 而是在输出 HTML 上使用 sanitize 库，例如 DOMPurify（推荐）、sanitize-html 或 crazy！ 
        */
        sanitize?: boolean;
        /** 用于清理传递给 markdownString 的 HTML 的函数。 */
        sanitizer?: Function;
        /** 如果为真，解析器不会抛出任何异常。 */
        silent?: boolean;
        /** 如果为 true，则使用比 markdown.pl 中的列表行为更智能的列表行为。 */
        smartLists?: boolean;
        /** 如果为真，请对引号和破折号之类的内容使用“智能”印刷标点符号。 */
        smartypants?: boolean;
        /** 一个包含从 Markdown 创建令牌的函数的对象。有关更多详细信息，请参阅可扩展性。 */
        tokenizer?: object;
        /** 为每个令牌调用的函数。有关更多详细信息，请参阅可扩展性。 */
        walkTokens?: Function;
        /** 如果为 true，则按照 XHTML 的要求为带有“/”的空元素（<br/>、<img/> 等）发出自闭合 HTML 标记。 */
        xhtml?: boolean;
    }

    /**
     * md工具实例
     */
    export namespace marked {
        /**
         * 扩展
         * @param _ops 
         */
        export function use(..._ops: IOp[]): void;
        /**
         * 解析md字符串
         * @param _str 
         * @param _op 
         * @param _back 
         */
        export function parse(_str: string, _op?: IOp, _back?: Function): string;

        /**
         * 设置选项
         * @param _op 
         */
        export function setOptions(_op: IOp): any;

        /**
         * 渲染器
         */
        export class Renderer { }
    }
}

declare module 'element-plus/dist/locale/*' {
    const obj: any;
    export default obj;
}

declare module 'color' {
    const obj: any;
    export default obj;
}