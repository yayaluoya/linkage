import { instanceTool } from "yayaluoya-tool/dist/instanceTool"
import { EmojiT } from "yayaluoya-tool/dist/EmojiT";
import OSS from "ali-oss";
import { ApiCon } from "./ApiCon";

/**
 * 公共api控制器
 */
@instanceTool()
export class ComApiCon extends ApiCon {
    /** 单例 */
    static readonly instance: ComApiCon;
    /** 测试 */
    test() {
        return this.getData<any>({
            url: '/com/test',
        });
    }
    /** 获取md帮助信息 */
    getMdHelp() {
        return this.getChche('/com/getMdHelp', () => {
            return this.getData<string>({
                url: '/com/getMdHelp',
            });
        });
    }
    /** 获取emoji列表 */
    getEmoji() {
        return this.getChche('/com/getEmoji', () => {
            return this.getData<string>({
                url: '/com/getEmoji',
            }).then((str) => {
                return JSON.parse(str).map((item: any) => {
                    item.list = [...EmojiT.utf16toEntities(item.list).matchAll(/&#[0-9]+;/g)].map((_) => {
                        return EmojiT.entitiestoUtf16(_[0]);
                    });
                    return item;
                }) as {
                    title: string;
                    list: string[];
                }[];
            });
        });
    }
    /** 获取sts的key */
    getSts() {
        return this.getData<OSS.Credentials>({
            url: '/admin/getSts',
        });
    }
}