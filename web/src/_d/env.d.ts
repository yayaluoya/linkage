/// <reference types="vite/client" />

/**
 * 对env的扩展
 */
interface ImportMetaEnv {
    /** 测试字符串 */
    VITE_TEST: string;
    /** baseURL */
    VITE_BASE_URL: string;
}
