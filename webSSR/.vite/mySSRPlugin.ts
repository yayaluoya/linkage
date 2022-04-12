import { Options } from "@vitejs/plugin-vue";
import { PluginOption } from "vite";
/**
 * 我的ssr插件，针对不同端的代码的编译
 * @param _op 选项
 * @returns 
 */
export function mySSRPlugin(_op?: Options): PluginOption {
    return {
        name: 'my-ssr',
        transform(code: string, id: string, options?: {
            ssr?: boolean;
        }) {
            if (options?.ssr) {
                // 执行 ssr 专有转换...
                // console.log(code);
            } else {
                //
            }
            return code;
        }
    }
}