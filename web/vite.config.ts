import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path, { resolve } from 'path';
import { svgBuilder } from './.vite/svgBuilder';
import vitePluginAliOss from 'vite-plugin-ali-oss';
import { ServerConfig } from 'global-module/dist/ServerConfig';

function pathResolve(dir: string) {
  // console.log(resolve(process.cwd(), '.', dir));
  return resolve(process.cwd(), '.', dir);
}

const prod = process.env.NODE_ENV === 'production';

const outDir = './dist';

const options = {
  region: ServerConfig.aliOss.region,
  accessKeyId: ServerConfig.aliOss.access.accessKeyId,
  accessKeySecret: ServerConfig.aliOss.access.accessKeySecret,
  bucket: '',
  overwrite: true,
};

// https://vitejs.dev/config/
export default defineConfig({
  base: prod
    ? `https://${options.bucket}.${options.region}.aliyuncs.com/${ServerConfig.Name}/`
    : '/', // must be URL when build
  build: {
    outDir,
  },
  plugins: [vue(), svgBuilder('./src/assets/svg/'), vitePluginAliOss(options) as any],
  server: {
    port: 3001,
  },
  resolve: {
    alias: [
      /** 根目录简写 */
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
      /** 组件目录简写 */
      {
        find: />\//,
        replacement: pathResolve('src/components') + '/',
      },
      /** 工具目录简写 */
      {
        find: /-\//,
        replacement: pathResolve('src/utils') + '/',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, //允许链式调用的换行
      },
    },
  },
});
