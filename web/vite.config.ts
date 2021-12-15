import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

function pathResolve(dir: string) {
  console.log(resolve(process.cwd(), '.', dir));
  return resolve(process.cwd(), '.', dir);

}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      /** 根路径简写 */
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
      /** 组件跟路径简写 */
      {
        find: />\//,
        replacement: pathResolve('src/components') + '/',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,//允许链式调用的换行
      }
    }
  }
})
