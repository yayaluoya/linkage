import { ApiConfig } from "../http/ApiConfig";

/**
 * url注入
 */
export default Behavior({
    data: {
        baseImageUrl: ApiConfig.domainPath.image,
    },
});