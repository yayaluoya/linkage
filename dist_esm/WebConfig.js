import { ObjectUtils } from 'yayaluoya-tool/dist/obj/ObjectUtils';
import { MainConfig } from './MainConfig';
/**
 * 前端配置
 * TODO 此模块只能前端导入
 */
export class WebConfig extends MainConfig {
}
/**
 * 阿里云相关配置
 * TODO 测试用的临时配置
 */
WebConfig.aliOss = {
    region: '',
    bucket: '',
};
try {
    import('../.local/web.config').then((module) => {
        ObjectUtils.merge(WebConfig, module.default);
    });
}
catch (_a) {
    //
}
