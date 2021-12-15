type route = {
    path: string,
    type: 'com' | 'tab',
    name?: string,
};
/**
 * 路由列表
 */
export const routers: route[] = [];
/** 页面跳转方法的参数 */
type IPageJumpPageToArg = {
    page: route;
    query?: Record<string, string>
};
export interface IPageJump {
    /** 跳转目标页面 */
    pageTo(e: {
        currentTarget: {
            dataset: IPageJumpPageToArg,
        }
    }): void;
}
export default Behavior({
    data: {
        route: routers.reduce<Record<string, route>>((a, b) => {
            a[b.name!] = b;
            return a;
        }, {}),
    },
    methods: {
        pageTo(e: WechatMiniprogram.BaseEvent) {
            let _arg: IPageJumpPageToArg = e.currentTarget.dataset as any;
            let _page = _arg.page;
            let url = _page.path;
            let _query = _arg.query;
            let _queryStr = '';
            if (_query) {
                _queryStr += '?';
                for (let i in _query) {
                    _queryStr += `${i}=${_query[i]}&`;
                }
            }
            //
            if (_page.type == 'tab') {
                wx.switchTab({
                    url: url + _queryStr,
                });
            } else {
                wx.navigateTo({
                    url: url + _queryStr,
                });
            }
        },
    },
});