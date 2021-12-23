import { AsyncComType, parseAsyncComOp } from "./AsyncComType";
import { SSROpT } from "./SSROpT";


/**
 * 解析组件中的异步数据
 * @param coms 组件列表 
 */
export async function parseAsyncComData(coms: AsyncComType[], _op: parseAsyncComOp) {
    if (!coms || coms.length == 0) {
        return;
    }
    for (let com of coms) {
        await parseAsyncData_(com, _op);
    }
}
/** 配合解析异步数据，深度优先 */
async function parseAsyncData_(com: AsyncComType, _op: parseAsyncComOp) {
    com.components = com.components || {};
    for (let i in com.components) {
        parseAsyncData_(com.components[i] as AsyncComType, _op);
    }
    //对组件的setup方法进行注入封装，同时缓存原始的setup方法 
    if (!com.setup__asyncData) {
        com.setup__asyncData = com.setup;
    }
    //必须是ssr组件才能解析
    if (com[SSROpT.key as any]) {
        let _asyncData = await Promise.resolve(com.asyncData?.({ ..._op, })).catch((e) => {
            console.error(e);
            return {};
        });
        //
        com.setup = function (this: any, ...arg: any[]) {
            return {
                ...com.setup__asyncData!.call(this, ...arg),
                ..._asyncData,
            };
        }
    }
}