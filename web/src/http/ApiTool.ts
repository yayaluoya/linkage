import { ApiConfig, EDomainName } from "./ApiConfig";

/**
 * Api工具
 */
export class ApiTool {
    /**
     * 添加查询参数
     * @param _url 原url
     * @param _query 查询参数
     */
    static addQuery(_url: string, _query: Record<string, string> = {}): string {
        if (!_url) { return _url; }
        //先提取原_url参数
        let urlStructure = _url.split('?');
        let __url = urlStructure[0];
        let __query = new URLSearchParams(urlStructure[1] || '');
        for (let i in _query) {
            __query.set(i, _query[i]);
        }
        return `${__url}?${__query.toString()}`;
    }

    /**
     * 获取api
     * @param {*} domainName 域
     * @param {*} url 局部url
     * @param  {*} pathArgs 路径参数
     */
    static getApi(domainName: EDomainName, url: string, pathArgs?: Record<string, string>): string {
        //替换url中的路径参数
        if (pathArgs) {
            for (let i in pathArgs) {
                url = url.replace(new RegExp(`[/{]+${i}[/}]+`, 'g'), `/${pathArgs[i]}/`);
            }
        }
        //组合路径
        return this.combinationApi(domainName, url);
    }

    /** 获取web的api */
    static getWebApi(url: string, pathArgs?: Record<string, string>) {
        return this.getApi(EDomainName.web, url, pathArgs);
    }
    /** 获取图片api */
    static getImageApi(url: string, pathArgs?: Record<string, string>) {
        return this.getApi(EDomainName.image, url, pathArgs);
    }
    /** 获取测试api */
    static getTestApi(url: string, pathArgs?: Record<string, string>) {
        return this.getApi(EDomainName.test, url, pathArgs);
    }

    /**
     * 组合api
     * @param {*} domainName 域
     * @param {*} url api
     */
    static combinationApi(domainName: EDomainName, url: string): string {
        let domainPath = ApiConfig.domainPath[domainName];
        if (!domainPath) {
            console.error('没有找到api域', domainName);
            return '';
        }
        domainPath = domainPath.replace(/\/+$/, '');
        url = url.replace(/[\\/]+/g, '/').replace(/^\//, '');
        //
        return `${domainPath}/${url}`;
    }
}