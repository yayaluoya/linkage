import { ApiConfig } from "@/http/ApiConfig";
import { AxiosRequestConfig } from "axios";
import { ApiCon } from "../ApiCon";

/**
 * webApi
 */
export class WebApiCon extends ApiCon {
    /**  */
    protected get op(): AxiosRequestConfig {
        return {
            baseURL: ApiConfig.domainPath.web,
        };
    }
}