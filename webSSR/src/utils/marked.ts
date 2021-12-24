import { marked } from 'marked';
import hljs from "highlight.js"; // 引入 highlight.js
// import "highlight.js/styles/github.css"; // 引入高亮样式
import "highlight.js/styles/atom-one-dark.css"; // 引入高亮样式
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

export default marked;