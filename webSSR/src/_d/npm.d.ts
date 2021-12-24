/** 
 * 对一些npm库的声明
*/

declare module '@kangc/*' {
    const obj: any;
    export default obj;
}

declare module 'animejs/*' {
    const obj: any;
    export default obj;
}

declare module 'pako' {
    const obj: any;
    export default obj;
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
    export namespace marked {
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
