/**
 * 递归查询元素
 * 主要是为了查询包括shadowDom中的元素
 * @param el
 * @param query
 */
export function querySelector<T extends HTMLElement = HTMLElement>(
    el: HTMLElement,
    query: (el: HTMLElement) => boolean,
): T[] {
    let list: any[] = [];
    if (el) {
        //遍历子节点
        Array.from((el.shadowRoot || el).children).forEach((item) => {
            list.push(...querySelector(item as any, query));
        });
        if (query(el)) {
            list.push(el);
        }
    }
    return list;
}
