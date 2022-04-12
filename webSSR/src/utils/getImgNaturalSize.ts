import { Vector2 } from "./Vector2";

/** 缓存列表，同一个路径只会有一个请求存在 */
const catchMap: Map<string, Promise<Vector2>> = new Map();

/**
 * 获取元素真实宽高
 * @param el 
 */
export function getImgNaturalSize(el: HTMLImageElement): Promise<Vector2> {
    let src = el.src;
    if (catchMap.has(src)) {
        return catchMap.get(src)!;
    }
    let p: Promise<Vector2> = new Promise((r, e) => {
        let img = new Image();
        img.src = src;
        //解决跨域用
        img.crossOrigin = 'anonymous';
        img.addEventListener('load', () => {
            r(new Vector2(img.naturalWidth, img.naturalHeight));
        });
        img.addEventListener('error', () => {
            e();
        });
    });
    catchMap.set(src, p);
    return p;
}