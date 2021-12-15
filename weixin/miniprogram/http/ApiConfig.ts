import { MainApiPath } from "./apiPath/MainApiPath";
import { TestApiPath } from "./apiPath/TestApiPath";

/** 域名 */
const domainPath: Record<EDomainName, string> = {
    test: '',
    web: 'http://192.168.3.112:3060',
    image: 'http://192.168.3.112:3060',
};

/** api路径 */
const apiPath = {
    main: MainApiPath,
    test: TestApiPath,
    /** 文件相关 */
    file: {
        update: 'file/uplode',
    },
    /** 时间相关的api */
    time: {
        getTime: 'time/getTime'
    }
};

/**
 * api配置
 */
export const ApiConfig = {
    domainPath,
    apiPath,
};

/** 域名枚举 */
export enum EDomainName {
    /** web */
    web = 'web',
    /** image */
    image = 'image',
    /** 测试 */
    test = 'test',
}