import { Crypto_ } from "@/utils/Crypto_";
import { InstanceTool } from "com_utils/InstanceTool";
import { BaseDataProxy } from "../BaseDataProxy";

/**
 * 临时数据
 */
@InstanceTool()
export class TemporaryDataProxy extends BaseDataProxy<{
    /** 看的博客id列表 */
    showBlogIds: [number, number][],
}>{
    /** 单例 */
    static instance: TemporaryDataProxy;

    protected getNewData() {
        return {
            showBlogIds: [],
        };
    }

    /**
     * 是否看过某篇博客
     * @param id 
     * @returns 
     */
    ifShowBlod(id: number): boolean {
        let onTime = Date.now();
        //剔除掉已经过期的
        this.data.showBlogIds = this.data.showBlogIds.filter((item) => {
            return Math.abs(item[1] - onTime) <= 1000 * 60 * 60 * 24;
        });
        let ifShow = this.data.showBlogIds.some((item) => {
            return item[0] == id;
        });
        if (ifShow) {
            return true;
        } else {
            this.data.showBlogIds.push([id, onTime]);
            return false;
        }
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