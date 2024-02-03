const { startSync } = require('server-file-sync');
const path = require('path');
const fs = require('fs');
const { MainConfig } = require('../dist/MainConfig');
const { ObjectUtils } = require('yayaluoya-tool/dist/obj/ObjectUtils');

/** 服务器根路径 */
const serverRootUrl = `/www/pm2/${MainConfig.Name}`;

let localConfig = {};
try {
  ObjectUtils.merge(localConfig, require('../.local/uploadDist.config'));
} catch {
  //
}

/**
 * 上传打包后的代码
 */
async function uploadDist() {
  const keyUrl = path.join(__dirname, '../.ssh/a');
  if (
    !fs
      .statSync(keyUrl, {
        throwIfNoEntry: false,
      })
      ?.isFile()
  ) {
    console.log(`
请配置服务器ssh连接私钥以便上传包文件到服务器
可以在当前项目执行目录下执行ssh-keygen -f ./.ssh/a命令生成秘钥并把公钥（.pub结尾的文件）交给后端添加到服务器中
然后重新上传就可以了
      `);
    return;
  }
  startSync({
    /** 主机地址 */
    host: '',
    /** 端口号 */
    port: 22,
    /** 用户名 */
    username: 'root',
    /** 私钥字符串 */
    privateKey: fs.readFileSync(keyUrl),
    /** 合并本地的配置 */
    ...localConfig,
    /** 同步列表 */
    syncList: [
      {
        key: 'config',
        title: '配置文件',
        paths: [
          {
            local: path.join(__dirname, '../.local/.keep'),
            remote: `${serverRootUrl}/.local/.keep`,
          },
        ],
      },
      /** 因为后端不会打包依赖，所以需要把依赖的全局模块传上去 */
      {
        key: 'global',
        title: '全局模块',
        paths: [
          {
            local: path.join(__dirname, '../dist'),
            remote: `${serverRootUrl}/dist`,
            ignored: [
              path.join(__dirname, '../dist/**/*.d.ts').replace(/\\+/g, '/'),
              path.join(__dirname, '../dist/**/*.d.ts.map').replace(/\\+/g, '/'),
            ],
          },
          {
            local: path.join(__dirname, '../package.json'),
            remote: `${serverRootUrl}/package.json`,
          },
          {
            local: path.join(__dirname, '../ecosystem.config.js'),
            remote: `${serverRootUrl}/ecosystem.config.js`,
          },
        ],
        laterF(connF) {
          return connF().then((conn) => {
            return upatePm2(conn).finally(() => {
              conn.end();
            });
          });
        },
      },
      {
        key: 'server',
        title: '后端包',
        paths: [
          {
            local: path.join(__dirname, '../server/_data'),
            remote: `${serverRootUrl}/server/_data`,
          },
          {
            local: path.join(__dirname, '../server/_localData/.keep'),
            remote: `${serverRootUrl}/server/_localData/.keep`,
          },
          {
            local: path.join(__dirname, '../server/dist'),
            remote: `${serverRootUrl}/server/dist`,
            ignored: [
              path.join(__dirname, './server/dist/**/*.js.map').replace(/\\+/g, '/'),
              path.join(__dirname, './server/dist/**/*.d.ts').replace(/\\+/g, '/'),
              path.join(__dirname, './server/dist/**/*.d.ts.map').replace(/\\+/g, '/'),
            ],
          },
          {
            local: path.join(__dirname, '../server/package.json'),
            remote: `${serverRootUrl}/server/package.json`,
          },
        ],
        laterF(connF) {
          return connF().then((conn) => {
            return upatePm2(conn).finally(() => {
              conn.end();
            });
          });
        },
      },
      {
        key: 'web',
        title: '前端包',
        paths: [
          {
            local: path.join(__dirname, '../web/dist/index.html'),
            remote: `${serverRootUrl}/web/dist/index.html`,
          },
        ],
      },
    ],
    /** ssh2的连接配置 */
    connectConfig: {},
    /** 是否监听 */
    watch: false,
  });
}

/**
 * 更新pm2
 * @param {import('ssh2').Client} conn
 */
function upatePm2(conn) {
  return new Promise((r) => {
    conn.exec(`pm2 start ${serverRootUrl}/ecosystem.config.js`, (err, stream) => {
      if (err) {
        console.log('出错了', err);
        r();
        return;
      }
      stream
        .on('close', (code, signal) => {
          r();
        })
        .on('data', (data) => {
          console.log('STDOUT: ' + data);
        })
        .stderr.on('data', (data) => {
          console.log('STDERR: ' + data);
        });
    });
  });
}

uploadDist();
