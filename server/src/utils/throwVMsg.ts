/**
 * 抛出验证错误信息
 */
export function throwVMsg(vmsg: string = '') {
    if (vmsg) {
        throw vmsg;
    }
}
