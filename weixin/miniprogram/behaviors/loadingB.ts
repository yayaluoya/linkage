/**
 * 加载器注入
 */
export default Behavior({
    data: {
        showLoading: false,
    },
    methods: {
        loading(_b: boolean) {
            this.setData({
                showLoading: _b,
            });
        },
    },
});