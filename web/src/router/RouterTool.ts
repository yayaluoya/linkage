import { RouteMeta, RouteRecordRaw_ } from "vue-router";
import router from ".";

/**
 * 路由工具
 */
export class RouterTool {
    /**
     * vue文件中导出的meta模块名
     * 配置的meta值直接作为一个promise的返回值，所有也可以是一个promise
     */
    static vueMetaKey = 'meta';

    /**
     * 获取一个页面的meta配置
     * @param _path 路径名字
     */
    static async getMate(_path: string): Promise<RouteMeta | null> {
        return this.getMate_(_path, router.options.routes as any, []);
    }
    /** 配合查找页面meta，深度优先查找 */
    private static async getMate_(_path: string, routers: RouteRecordRaw_[], _dir: string[]): Promise<RouteMeta | null> {
        if (!routers || routers.length == 0) { return null; }
        for (let i in routers) {
            let __dir = [..._dir, routers[i].path];
            let reset = await this.getMate_(_path, routers[i].children as any, __dir);
            if (reset) {
                return reset;
            }
            let _pathReg = __dir.join('/').replace(/:[a-zA-Z0-9]+/, '[\\s\\S]+');
            if (new RegExp(`^${_pathReg}/?(\\?[\\s\\S]*)?$`, 'i').test(_path)) {
                return await routers[i].metaP || Promise.resolve(null);
            }
        }
        return null;
    }
}