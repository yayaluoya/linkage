import { BaseDataProxy } from "../BaseDataProxy";
import { InstanceTool } from "com_utils/InstanceTool";
import { Crypto_ } from "@/utils/Crypto_";

/**
 * 博客评论数据代理
 * 主要用来限制某个对博客的评论
 */
@InstanceTool()
export class BlogCDP extends BaseDataProxy<{
    [key: number]: number[];
}> {
    /** 单例 */
    static instance: BlogCDP;

    /**
     * 是否能评论
     * @param id 博客id
     * @returns 
     */
    ifC(id: number): boolean {
        if (typeof id == 'undefined') { return true; }
        if (!this.data[id]) {
            this.data[id] = [];
        } else {
            this.data[id] = this.data[id].filter((time) => {
                return Math.abs(time - Date.now()) <= 1000 * 60 * 60 * 24;
            });
            this.data[id].push(Date.now());
        }
        return this.data[id].length < 30;
    }

    protected getNewData() {
        return {};
    }

    /** 数据处理，可以在数据被获取和设置前做加密解密操作 */
    protected dataHandle(str: string, type: 'get' | 'set'): string {
        switch (type) {
            case 'get':
                return Crypto_.decryptionData(str);
            case 'set':
                // console.log('设置用户数据', str);
                return Crypto_.encryptionData(str);
        }
    }
}