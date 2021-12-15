import { MainApiCon } from "../../http/apiCon/MainApiCon";
import { TestApiCon } from "../../http/apiCon/TestApiCon";
import { TestDataProxy } from "../../localData/dataItem/TestDataProxy";

// pages/test/test.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        str: '测试字符串',
        a: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        //测试请求
        TestApiCon.testPost().then((d) => {
            console.log('请求数据', d);
            this.setData({
                str: d,
            });
        }).catch(e => {
            console.log('请求失败', e);
        });
        //获取所有常量
        MainApiCon.getAllConst().then((d) => {
            console.log('所有常量数据', d);
        });
        //随机获取一个事件
        MainApiCon.randomEvent({
            userId: 1,
        }).then((d) => {
            console.log('随机事件', d);
        });
        //获取登录用户凭证
        MainApiCon.directlyGetUserInfo().then((d) => {
            console.log('用户信息', d);
        });
        setInterval(() => {
            TestDataProxy.instance.data.a++;
            this.setData({
                a: TestDataProxy.instance.data.a,
            });
        }, 100);

        //
        this.selectComponent('#md').setContent({
            content: `
![Description](https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg)
![Description](https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg)
            `,
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})