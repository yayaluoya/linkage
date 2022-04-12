const fs = require('fs');
const path = require('path');

try {
    fs.rmSync(path.join(__dirname, '../node_modules/.vite'), {
        recursive: true,
    });
    console.log('vite缓存已删除');
} catch (e) {
    console.log('删除错误', e);
}
