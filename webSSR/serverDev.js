const fs = require('fs')
const path = require('path')
const express = require('express')
const { createServer: createViteServer } = require('vite')
const cheerio = require('cheerio');

const port = 3603;

async function createServer() {
    //创建一个express应用
    const app = express()

    // 以中间件模式创建 Vite 应用，这将禁用 Vite 自身的 HTML 服务逻辑
    // 并让上级服务器接管控制
    //
    // 如果你想使用 Vite 自己的 HTML 服务逻辑（将 Vite 作为
    // 一个开发中间件来使用），那么这里请用 'html'
    const vite = await createViteServer({
        server: { middlewareMode: 'ssr' }
    })
    // 使用 vite 的 Connect 实例作为中间件
    // 这个中间件做的事有拦截静态文件路由
    app.use(vite.middlewares)

    app.use('*', async (req, res) => {
        // 服务 index.html - 下面我们来处理这个问题
        const url = req.originalUrl

        try {
            // 1. 读取 index.html
            let template = fs.readFileSync(
                path.resolve(__dirname, 'index.html'),
                'utf-8'
            )

            // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
            //    同时也会从 Vite 插件应用 HTML 转换。
            //    例如：@vitejs/plugin-react-refresh 中的 global preambles
            template = await vite.transformIndexHtml(url, template)

            // 3. 加载服务器入口。vite.ssrLoadModule 将自动转换
            //    你的 ESM 源码使之可以在 Node.js 中运行！无需打包
            //    并提供类似 HMR 的根据情况随时失效。
            const { render } = await vite.ssrLoadModule('/src/entry-server.ts')

            // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
            //    函数调用了适当的 SSR 框架 API。
            //    例如 ReactDOMServer.renderToString()
            const { appHtml, headLable } = await render(url)

            // 5. 对html的头信息进行修改
            if (Object.keys(headLable).length > 0) {
                let $template = cheerio.load(template);
                for (let i in headLable) {
                    $template(`head>${i}`).text(headLable[i]);
                }
                template = $template.html();
            }

            // 6. 注入渲染后的应用程序 HTML 到模板中。
            const html = template.replace(`<!--ssr-outlet-->`, appHtml)

            // 7. 返回渲染后的 HTML。
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
            // 你的实际源码中。
            vite.ssrFixStacktrace(e)
            console.error(e)
            res.status(500).end(e.message)
        }
    })
    //监听端口
    app.listen(port)
}

createServer();

console.log('服务启动->', `http://localhost:${port}`);