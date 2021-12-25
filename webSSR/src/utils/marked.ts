import { marked } from 'marked';
import hljs from "highlight.js"; // 引入 highlight.js
import { Env } from '@/_d/Env';
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
 * 获取Highlight主题的样式元素
 */
export function getHighlightThemeStyleEl(_name: string) {
    let id = Date.now() + '-' + _name;
    if (!_name) {
        return {
            id,
            linkEl: document.createElement("link"),
        };
    }
    let linkEl = document.createElement("link");
    //添加cdn的路径
    linkEl.href = `https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.3.1/build/styles/${_name}.min.css`;
    linkEl.rel = "stylesheet";
    return {
        id,
        linkEl,
    };
}

Env.ifC && ((window as any)['marked'] = marked);

export default marked;