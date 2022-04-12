import { entitiestoUtf16, utf16toEntities } from "@/utils/Emoji";
import { JSONPar } from "@/utils/JSONPar";
import { Env } from "@/_d/Env";
import { InstanceTool } from "com_utils/InstanceTool"
import { WebApiCon } from "./WebApiCon";

/**
 * 主api控制器
 */
@InstanceTool()
export class ComApiCon extends WebApiCon {
    /** 单例 */
    static readonly instance: ComApiCon;

    /** 根路径 */
    get _rootApi() {
        return super.rootApi.main.com;
    }

    /** 测试 */
    test() {
        return this.getData<any>({
            url: this._rootApi.test,
        });
    }
    /** 清除博客缓存 */
    deleteBlogCatch(id: number) {
        let key = `${this._rootApi.getOneBlog}?id=${id}`;
        this.removeCache(key);
    }
    /** 获取一篇博客 */
    getOneBlog(id: number) {
        if (Env.ifS) {
            return this.getData<EN.IBlogE>({
                url: this._rootApi.getOneBlog,
                params: {
                    id,
                },
            });
        }
        //只在c端允许有缓存
        let key = `${this._rootApi.getOneBlog}?id=${id}`;
        return this.getCache(key, () => {
            return this.getData<EN.IBlogE>({
                url: this._rootApi.getOneBlog,
                params: {
                    id,
                },
            });
        });
    }
    /** 获取时间线上的博客 */
    getTimeLineBlog(id: number, size: number) {
        return this.getData<EN.IBlogE[]>({
            url: this._rootApi.getTimeLineBlog,
            params: {
                id,
                size,
            },
        });
    }
    /** 查找博客 */
    findBlog(data: ComN.IPageQuery<{
        str?: string;
        tagIds?: number[];
    }>) {
        return this.postData<ComN.IPageData<EN.IBlogE>>({
            url: this._rootApi.findBlog,
            data,
        });
    }
    /** 添加博客阅读速量 */
    addBlogShowNumber(id: number) {
        return this.getData({
            url: this._rootApi.addBlogShowNumber,
            params: {
                id,
            },
        });
    }
    /** 获取全部博客标签 */
    getAllBlogTab() {
        return this.getData<EN.IBlogTabE[]>({
            url: this._rootApi.getAllBlogTab,
        });
    }
    /** 获取一个博客标签的数据 */
    getOneBlogTab(id: number) {
        return this.getData<EN.IBlogTabE>({
            url: this._rootApi.getOneBlogTab,
            params: {
                id,
            },
        });
    }
    /** 通过tab名字列表获取tab列表 */
    byTabNamesGetTabs(names: string[]) {
        return this.postData<EN.IBlogTabE[]>({
            url: this._rootApi.byTabNamesGetTabs,
            data: {
                tabNames: names,
            },
        });
    }
    /** 获取所有弹幕 */
    getAllBC() {
        return this.getData<EN.IBulletCommentE[]>({
            url: this._rootApi.getAllBC,
        });
    }
    /** 随机获取一个弹幕 */
    randomBC(ids: number[]) {
        return this.postData<EN.IBulletCommentE | null>({
            url: this._rootApi.randomBC,
            data: {
                ids,
            },
        });
    }
    /** 查找日记 */
    findDiary(data: ComN.IPageQuery<{
        str?: string;
    }>) {
        return this.postData<ComN.IPageData<EN.IDiaryE>>({
            url: this._rootApi.findDiary,
            data,
        });
    }
    /** 查找便签 */
    findMemo(data: {
        str?: string;
    }) {
        return this.postData<EN.IMemoE[]>({
            url: this._rootApi.findMemo,
            data,
        });
    }
    /** 登录 */
    login(data: Partial<EN.IUserE>) {
        return this.postData<EN.IUserE>({
            ['x-data-handles']: ['e'],
            url: this._rootApi.login,
            data,
        });
    }
    /** 登录用户数据 */
    loginUser() {
        return this.getData<EN.IUserE>({
            url: this._rootApi.loginUser,
        });
    }
    /** 清空用户缓存 */
    deleteGetUserCatch() {
        this.removeCache(this._rootApi.getUser);
    }
    /** 获取用户数据,这里注意如果没登录的话则获取的是main用户的信息,就是说这个接口一定会获取到用户的数据 */
    getUser() {
        return this.getCache(this._rootApi.getUser, () => {
            return this.getData<EN.IUserE>({
                url: this._rootApi.getUser,
            });
        });
    }
    /** 获取用户的memo数据,这里注意如果没登录的话则获取的是main用户的信息,就是说这个接口一定会获取到用户的数据 */
    getUserMemo() {
        return this.getData<string>({
            url: this._rootApi.getUserMemo,
        }).then((res) => {
            return JSONPar<Record<string, any>>(res, {});
        });
    }
    /** 添加评论 */
    addBC(data: Partial<Omit<EN.IBlogComment, 'theme'> & {
        theme: {
            md: string;
            code: string;
        },
    }>) {
        return this.postData<EN.IBlogComment>({
            url: this._rootApi.addBC,
            data,
        });
    }
    /** 查找评论 */
    findBC(data: ComN.IPageQuery<{
        blogId: number;
    }>) {
        return this.postData<ComN.IPageData>({
            url: this._rootApi.findBC,
            data,
        });
    }

    /** 获取md帮助信息 */
    getMdHelp() {
        return this.getCache(this._rootApi.getMdHelp, () => {
            return this.requestData<string>({
                url: this._rootApi.getMdHelp,
            });
        });
    }

    /** 获取贡献年份列表 */
    getContributionY() {
        return this.getData<number[]>({
            url: this._rootApi.getContributionY,
        });
    }
    /** 获取贡献列表 */
    getContributionList(query: {
        /** 年份 */
        y: number;
    }) {
        return this.getData<EN.IContributionsE[]>({
            url: this._rootApi.getContributionList,
            params: query,
        });
    }
    /** 分页获取贡献内容 */
    pageContributionList(query: ComN.IPageQuery<{
        y?: number;
        m?: number;
        d?: number;
    }>) {
        return this.postData<ComN.IPageData<EN.IContributionsE>>({
            url: this._rootApi.pageContributionList,
            data: query,
        });
    }
    /** 获取某一日的贡献详情 */
    getContributionD(ids: number[]) {
        return this.postData<EN.IContributionsE[]>({
            url: this._rootApi.getContributionD,
            data: {
                ids,
            },
        });
    }

    /** 获取emoji列表 */
    getEmoji() {
        return this.getCache(this._rootApi.getEmoji, () => {
            return this.getData<string>({
                url: this._rootApi.getEmoji,
            }).then((str) => {
                return JSON.parse(str).map((item: any) => {
                    item.list = [...utf16toEntities(item.list).matchAll(/&#[0-9]+;/g)].map((_) => {
                        return entitiestoUtf16(_[0]);
                    });
                    return item;
                }) as {
                    title: string;
                    list: string[];
                }[];
            });
        });
    }
}