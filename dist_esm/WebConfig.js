import { MainConfig } from "./MainConfig";
/**
 * 前端配置
 */
export class WebConfig extends MainConfig {
}
/**
 * 阿里云相关配置
 * TODO 测试用的临时配置
 */
WebConfig.aliOss = {
    region: "",
    bucket: "",
};
