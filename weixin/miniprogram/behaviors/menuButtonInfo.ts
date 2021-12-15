/**
 * 胶囊信息混入
 */
export default Behavior({
    data: {
        menuButtonInfo: {},
    },
    async created() {
        let bbcr = wx.getMenuButtonBoundingClientRect();
        let systemInfo = await wx.getSystemInfo();
        this.setData({
            menuButtonInfo: {
                statusBarHeight: systemInfo.statusBarHeight,
                top: systemInfo.statusBarHeight + bbcr.height + (bbcr.top - systemInfo.statusBarHeight) * 2
            },
        });
    },
});