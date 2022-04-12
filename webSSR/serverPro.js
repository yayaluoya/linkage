const fs = require('fs')
const path = require('path')
const express = require('express')
const cheerio = require('cheerio');
const compression = require('compression');
const serveStatic = require('serve-static');

const port = 6101;

async function createServer() {
    //创建一个express应用
    const app = express()

    // 引入中间件处理器
    app.use(compression())//一个用来压缩用的中间件
    app.use(
        serveStatic(path.resolve(__dirname, './dist/client'), {
            index: false,
        })
    )

    // 1. 获取 index.html模板
    const template = fs.readFileSync(
        path.resolve(__dirname, './dist/client/index.html'),
        'utf-8'
    )

    app.use('*', async (req, res) => {
        // 服务 index.html - 下面我们来处理这个问题
        const url = req.originalUrl

        try {
            // 3. 加载服务器入口。vite.ssrLoadModule 将自动转换
            //    你的 ESM 源码使之可以在 Node.js 中运行！无需打包
            //    并提供类似 HMR 的根据情况随时失效。
            const { render } = require('./dist/server/entry-server.js')

            // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
            //    函数调用了适当的 SSR 框架 API。
            //    例如 ReactDOMServer.renderToString()
            const { appHtml, headLable } = await render(url)

            let _template = template;

            // 5. 对html的头信息进行修改
            if (Object.keys(headLable).length > 0) {
                let $template = cheerio.load(_template);
                for (let i in headLable) {
                    $template(`head>${i}`).text(headLable[i]);
                }
                _template = $template.html();
            }

            // 6. 注入渲染后的应用程序 HTML 到模板中。
            const html = _template.replace(`<!--ssr-outlet-->`, appHtml)

            // 7. 返回渲染后的 HTML。
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            res.status(500).end(e.message)
        }
    })
    //监听端口
    app.listen(port)
}

createServer();

console.log('服务启动->', `http://localhost:${port}`);