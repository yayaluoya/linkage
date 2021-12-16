import { ApiConfig } from "../ApiConfig";
import { ApiTool } from "../ApiTool";
import { BaseApiCon, IBaseApiOp } from "../BaseApiCon";
import { HttpStatus } from "com_utils/HttpStatus";
import { IResData } from "../res/IResData";
import { SecretCode } from "../SecretCode";

/**
 * 文件api控制器
 */
export class FileApiCon extends BaseApiCon {
    static get op(): IBaseApiOp {
        return {
            baseUrl: ApiConfig.domainPath.web,
        };
    }

    /** 根路径 */
    static get _rootApi() {
        return super.rootApi.main;
    }
    /**
     * 上传文件
     * @param _file 目标文件
     * @returns 
     */
    static update(_fileUrl: string) {
        return SecretCode.setSC({
            header: {},
        }).then(({ header }) => {
            return new Promise<string>((r, e) => {
                wx.uploadFile({
                    filePath: _fileUrl,
                    name: 'file',
                    url: ApiTool.getWebApi(ApiConfig.apiPath.file.update),
                    header: {
                        ...header,
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    success: (res) => {
                        let data: IResData = JSON.parse(res.data);
                        if (data.statusCode != HttpStatus.OK) {
                            e(res);
                            return;
                        } else {
                            r(data.data);
                        }
                    },
                    fail: e,
                });
            });
        });
    }
}