const { MainConfig } = require('./dist/MainConfig');

module.exports = {
  apps: {
    name: MainConfig.Name,
    script: './server/dist/main.js',
  },
};
