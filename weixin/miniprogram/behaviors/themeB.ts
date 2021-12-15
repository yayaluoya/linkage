import { MainApiCon } from "../http/apiCon/MainApiCon";
import { colourBlend, lighten } from "../utils/color";

/**
 * 主题混入数据模型
 */
export interface IThemeBData {
    theme: {
        backgroundColor: string;
        themeColor: string;
        contentColor: string;
        alertMaskColor: string;
        alertContentColor: string;
        alertTitleColor: string;
        fontColor: string;
        fontColor_: string;
        selectFontColor: string;
    }
}
export default Behavior({
    data: {
        theme: {
            backgroundColor: '#f5f5f5',
            themeColor: '#ffffff',
            contentColor: '#ffffff',
            alertMaskColor: '#151515',
            alertContentColor: '#f1f1f1',
            alertTitleColor: '#6d6d6d',
            fontColor: '#14274E',
            fontColor_: '#000000',
            selectFontColor: '#ffa940',
        },
    },
    methods: {
        /** 设置主题 */
        setTheme() {
            //根据当前theme数据设置页面
            wx.setNavigationBarColor({
                frontColor: this.data.theme.fontColor_,
                backgroundColor: this.data.theme.themeColor,
            });
            wx.setTabBarStyle({
                color: this.data.theme.fontColor_,
                selectedColor: this.data.theme.selectFontColor,
                backgroundColor: this.data.theme.themeColor,
                complete: () => { },
                fail: () => { },
            });
            wx.setBackgroundColor({
                backgroundColor: this.data.theme.backgroundColor,
                backgroundColorBottom: this.data.theme.backgroundColor,
                backgroundColorTop: this.data.theme.backgroundColor,
            });
        },
    },
    /** 创建时执行 */
    created() {
        setTimeout(() => {
            // this.setData(this.data);
        }, 0);
    },
    /** 创建完成后执行 */
    ready() {
        //
    },
});