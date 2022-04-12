import { InstanceTool } from "com_utils/InstanceTool"
import { WebApiCon } from "./WebApiCon";

/**
 * gitApi控制器
 */
@InstanceTool()
export class GitApiCon extends WebApiCon {
    /** 单例 */
    static readonly instance: GitApiCon;

    /** 根路径 */
    get _rootApi() {
        return super.rootApi.main.git;
    }

    /** 测试 */
    test() {
        return this.getData<any>({
            url: this._rootApi.test,
        });
    }

    /** 获取gitee用户info */
    getGiteeUserInfo() {
        return this.getData<GitN.Gitee.IUserInfo>({
            url: this._rootApi.getGiteeUserInfo,
        });
    }

    /** 获取github用户info */
    getGithubUserInfo() {
        return this.getData<GitN.Github.IUserInfo>({
            url: this._rootApi.getGithubUserInfo,
        });
    }

    /** 获取gitee的开源仓库 */
    getGiteePublicRepos(_op: {
        page: number;
        per_page: number;
    }) {
        return this.getData<ComN.IPageData<GitN.Gitee.IRepos[]>>({
            url: this._rootApi.getGiteePublicRepos,
            params: _op,
        });
    }
    /** 获取github的开源仓库 */
    getGithubPublicRepos(_op: {
        page: number;
        per_page: number;
    }) {
        return this.getData<ComN.IPageData<GitN.Github.IRepos>>({
            url: this._rootApi.getGithubPublicRepos,
            params: _op,
        });
    }
}