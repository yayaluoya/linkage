import router from ".";
import { EPage } from "./EPage";
import { Base64 } from "com_utils/Base64";
import { SingleDependence } from "@/utils/SingleDependence";

/**
 * 页面工具
 */
export class PageTool {
    /**
     * 去一个会回退的页面
     * @param path  
     */
    static async toBackPage(path: EPage, query: any = {}) {
        let _router = await router;
        await _router.push({
            path,
            query: {
                back: _router.currentRoute.value.query.back || _router.currentRoute.value.fullPath,
                ...query,
            },
        });
    }

    /**
     * 页面回退
     */
    static async pageBack(path: EPage = EPage.Home, query: any = {}) {
        let _router = await router;
        await _router.push({
            path: (_router.currentRoute.value.query.back as string) || path,
            query,
        });
    }

    /**
     * 去博客页面
     * @param tagName 
     */
    static async toBlogPage(tagName?: string) {
        let _router = await router;
        if (_router.currentRoute.value.path == EPage.Blog) {
            let onTagNamesArr = ((_router.currentRoute.value.query.tags || '') as string).split(',').filter(Boolean);
            if (tagName) {
                //有就删除，没有就添加
                if (onTagNamesArr.includes(tagName)) {
                    onTagNamesArr = onTagNamesArr.filter(item => item != tagName);
                } else {
                    onTagNamesArr.push(tagName);
                }
            }
            tagName = onTagNamesArr.join(',') || undefined;
        }
        _router.push({
            path: EPage.Blog,
            query: {
                tags: tagName,
            },
        });
    }
}

// TODO 添加到单依赖文件中，防止在api模块中使用导致的循环依赖问题
SingleDependence.add('PageTool', PageTool);