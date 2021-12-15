/** md内容选项 */
export interface IMDOp {
    /** 内容 */
    content: string,
    /** 相对资源的base路径 */
    base: string,
    /** 主题 */
    theme: 'light' | 'dark'
}

// coms/md/md.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        _op: {},
        article: {},
    },

    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 设置md内容
         * @param _op 选项
         */
        setContent(_op: IMDOp) {
            let result = getApp().towxml(_op.content, 'markdown', {
                base: _op.base,
                theme: _op.theme,
            });
            // 更新解析数据
            this.setData({
                _op,
                article: result,
            });
        }
    }
})
