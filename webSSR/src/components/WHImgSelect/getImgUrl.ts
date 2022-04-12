import { WallhavenApiCon } from "@/http/apiCon/main/WallhavenApiCon";

interface P extends Promise<string> {
    /** 是否完成 */
    com: boolean;
}

/** 加载列表异步任务映射 */
const loadingListMapP: Map<string, P> = new Map();

/**
 * 获取图片真实路径
 * 通过这个入口缓存所有的图片真实路径，避免重复获取
 * @param detailsUrl 
 * @returns 
 */
export function getImgUrl(detailsUrl: string): Promise<string> {
    if (!loadingListMapP.has(detailsUrl)) {
        let p = WallhavenApiCon.instance.getImgUrl(detailsUrl) as P;
        p.then(() => {
            p.com = true;
        });
        loadingListMapP.set(detailsUrl, p);
    }
    return loadingListMapP.get(detailsUrl)!;
}

/**
 * 是否加载完成了
 * @param detailsUrl 
 */
export function ifLoadCom(detailsUrl: string): boolean {
    if (!loadingListMapP.has(detailsUrl)) {
        return false;
    }
    return !!loadingListMapP.get(detailsUrl)?.com;
}