import { defineConfig } from 'vite';
import path, { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

function pathResolve(dir: string) {
  // console.log(resolve(process.cwd(), '.', dir));
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      /** 根目录简写 */
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
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
