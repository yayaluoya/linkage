import { marked } from 'marked';
import hljs from "highlight.js"; // 引入 highlight.js
// import "highlight.js/styles/github.css"; // 引入高亮样式
// import "highlight.js/styles/atom-one-dark.css"; // 引入高亮样式
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code: string, lang: string) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
});

/**
 * 添加Highlight主题
 */
export function addHighlightClassFile(_name: string) {
    // 先检查是否已经导入
    const id = `${_name}-min-css`;
    let linkEl: HTMLLinkElement = document.getElementById(id)! as any;
    if (linkEl) {
        return;
    }
    linkEl = document.createElement("link");
    //添加cdn的路径
    linkEl.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/atom-one-dark.min.css`;
    linkEl.rel = "stylesheet";
    linkEl.id = id;
    document.head.appendChild(linkEl);
}

export default marked;