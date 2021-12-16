import router from ".";
import { CustomizeRouterType, IRouterMata } from "./RouterType";

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
     * 获取路由列表
     * 期间会替换掉路由中原先配置的meta
     * @returns 
     */
    static async getRoutes() {
        for (let item of router.options.routes) {
            //自定义的路由meta级别最高
            item.meta = (await (item as CustomizeRouterType).metaP as any) || item.meta || null;
        }
        return router.options.routes;
    }

    /**
     * 获取一个页面的meta配置
     * @param _path 路径名字
     */
    static getMate(_path: string): Promise<IRouterMata | null> {
        return this.getRoutes().then((list) => {
            return (list.find(item => {
                return item.path == _path;
            })?.meta as any) || null;
        });
    }
}