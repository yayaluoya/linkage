const fs = require('fs');
const path = require('path');

fs.rmdirSync(path.join(__dirname, '../node_modules/.vite'), {
    recursive: true,
});

console.log('清除完成');