import { AsyncComType, parseAsyncComOp } from "../AsyncComType";
import { SSROpT } from "../SSROpT";

/**
 * 解析组件中的头标签数据
 * @param com 组件列表 
 */
export async function parseAsyncComHeadLabel(com: AsyncComType, _op: parseAsyncComOp): Promise<Record<string, string>> {
    if (!com) {
        return {};
    }
    //必须是ssr组件才能解析
    if (com[SSROpT.key as any]) {
        return Promise.resolve(com.asyncHeadLabel?.(_op) || {});
    }
    return {};
}