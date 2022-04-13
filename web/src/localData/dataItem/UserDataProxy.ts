import { InstanceTool } from "com_utils/InstanceTool";
import { BaseDataProxy } from "../BaseDataProxy";
import { Crypto_ } from "@/utils/Crypto_";

/**
 * 用户数据
 */
@InstanceTool()
export class UserDataProxy extends BaseDataProxy<Partial<{
    token: string;
}>>{
    /** 单例 */
    static instance: UserDataProxy;

    /** 是否登录 */
    get ifLogin() {
        return !!this.data?.token;
    }

    /** 用户token */
    get token() {
        return this.data?.token || '';
    }

    /** 清空数据 */
    resetData() {
        for (let i in this.data) {
            delete (this.data as any)[i];
        }
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