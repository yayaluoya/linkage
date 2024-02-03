const { spawn } = require('child_process');

/**
 * 获取cmd标准输出
 */
function getCmdStd(cmd) {
  return new Promise((res, rej) => {
    let childP = spawn(cmd, {
      cwd: process.cwd(),
      shell: true,
    });
    childP.stderr.on('data', (err) => {
      rej(err);
    });
    let data = '';
    childP.stdout
      .setEncoding('utf-8')
      .on('data', (d) => {
        data += d;
      })
      .on('end', () => {
        res(data);
      });
  });
}

module.exports = { getCmdStd };
