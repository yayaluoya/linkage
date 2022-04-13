import { reactive } from "vue";

/**
 * css值
 */
export const cssValue = reactive<Record<'contentWidth' | 'headHeight', {
    value: any;
    tem: string;
}>>({
    /** 内容宽度 */
    contentWidth: {
        value: 1000,
        tem: '$px',
    },
    /** 头部高度 */
    headHeight: {
        value: 50,
        tem: '$px',
    },
});