import { createObjectProperty, DirectiveTransform } from "@vue/compiler-dom";
/**
 * ssr自定义指令转换
 * @returns 
 */
export function ssrTransformCustomDir(): Record<string, DirectiveTransform> {
    return {
        'loading': (dir, node, context) => {
            return {
                props: [],
                /** 这是个大坑，如果不为true的话在c端这个指令就没用了 */
                needRuntime: true,
            };
        },
    };
}