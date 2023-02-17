/**
 * 配置文件
 * 详细配置项见说明，或者直接看类型声明
 */
let getConfig;
try {
    getConfig = require("server-file-sync").getConfig;
} catch {
    getConfig = (_) => _();
}
const fs = require('fs');
const path = require('path');
const { MainConfig } = require('./dist/MainConfig');

/** 服务器根路径 */
const serverRootUrl = `/webs/${MainConfig.Name}`;

/** 更新pm2 */
function upatePm2(conn) {
    return new Promise((r) => {
        /** 必须要传一次后才能启动pm2 */
        if (true) {
            r();
            return;
        }
        conn.exec(`pm2 start ${serverRootUrl}/ecosystem.config.js`, (err, stream) => {
            if (err) {
                console.log('出错了', err);
                r();
                return;
            }
            stream.on('close', (code, signal) => {
                r();
            }).on('data', (data) => {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    });
}

module.exports = getConfig(() => {
    /**
     * 返回配置信息
     * TODO 可以是Promise
     */
    return {
        /** 主机地址 */
        host: '47.94.233.236',
        /** 端口号 */
        port: 22,
        /** 用户名 */
        username: 'root',
        /** 私钥密码 */
        passphrase: '',
        /** 私钥字符串 */
        privateKey: fs.readFileSync(path.join(__dirname, '.ssh/a')),
        /** 同步列表 */
        syncList: [
            {
                key: 'global',
                title: '全局模块',
                paths: [
                    {
                        local: path.join(__dirname, './dist'),
                        remote: `${serverRootUrl}/dist`,
                        ignored: [
                            path.join(__dirname, './dist/**/*.d.ts').replace(/\\+/g, '/'),
                            path.join(__dirname, './dist/**/*.d.ts.map').replace(/\\+/g, '/'),
                            /**
                             * 服务器会有不同版本的文件
                             * 所以这些文件只需要同步一次
                             */
                            // path.join(__dirname, './dist/MainConfig.js').replace(/\\+/g, '/'),
                            // path.join(__dirname, './dist/ServerConfig.js').replace(/\\+/g, '/'),
                            // path.join(__dirname, './dist/WebConfig.js').replace(/\\+/g, '/'),
                        ],
                    },
                    {
                        local: path.join(__dirname, './package.json'),
                        remote: `${serverRootUrl}/package.json`,
                    },
                    {
                        local: path.join(__dirname, './ecosystem.config.js'),
                        remote: `${serverRootUrl}/ecosystem.config.js`,
                    },
                ],
                laterF(connF) {
                    return connF().then(conn => {
                        return upatePm2(conn).finally(() => {
                            conn.end();
                        });
                    });
                },
            },
            {
                key: 'server',
                title: '后端',
                paths: [
                    {
                        local: path.join(__dirname, './server/_data'),
                        remote: `${serverRootUrl}/server/_data`,
                    },
                    {
                        local: path.join(__dirname, './server/_localData/.keep'),
                        remote: `${serverRootUrl}/server/_localData/.keep`,
                    },
                    {
                        local: path.join(__dirname, './server/dist'),
                        remote: `${serverRootUrl}/server/dist`,
                        ignored: [
                            path.join(__dirname, './server/dist/**/*.js.map').replace(/\\+/g, '/'),
                            path.join(__dirname, './server/dist/**/*.d.ts').replace(/\\+/g, '/'),
                            path.join(__dirname, './server/dist/**/*.d.ts.map').replace(/\\+/g, '/'),
                        ],
                    },
                    {
                        local: path.join(__dirname, './server/package.json'),
                        remote: `${serverRootUrl}/server/package.json`,
                    },
                ],
                laterF(connF) {
                    return connF().then(conn => {
                        return upatePm2(conn).finally(() => {
                            conn.end();
                        });
                    })
                },
            },
            {
                key: 'web',
                title: '前端',
                paths: [
                    {
                        local: path.join(__dirname, './web/dist/index.html'),
                        remote: `${serverRootUrl}/web/dist/index.html`,
                    },
                ],
            },
        ],
        /** ssh2的连接配置 */
        connectConfig: {},
        /** 是否监听 */
        watch: false,
    }
})