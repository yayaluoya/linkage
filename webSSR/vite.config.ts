import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import { svgBuilder } from './.vite/svgBuilder';
import { ssrTransformCustomDir } from './.vite/ssrTransformCustomDir';
import { mySSRPlugin } from './.vite/mySSRPlugin';


function pathResolve(dir: string) {
  console.log(resolve(process.cwd(), '.', dir));
  return resolve(process.cwd(), '.', dir);

}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [mySSRPlugin(), vue({
    template: {
      ssr: true,
      compilerOptions: {
        directiveTransforms: ssrTransformCustomDir(),
      },
    },
  }), svgBuilder('./src/assets/svg/')],
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
        javascriptEnabled: true,//允许链式调用的换行
      }
    }
  },
  build: {
    //转成es2015的代码
    target: 'es2015',
  },
})
