import { Options } from "@vitejs/plugin-vue";
import { Plugin } from "vite";
/**
 * 我的ssr插件，针对不同端的代码的编译
 * @param _op 选项
 * @returns 
 */
export function mySSRPlugin(_op?: Options): Plugin {
    return {
        name: 'my-ssr',
        transform(code: string, id: string, options?: {
            ssr?: boolean;
        }) {
            if (options?.ssr) {
                // 执行 ssr 专有转换...
            } else {
                //
            }
            return code;
        }
    }
}