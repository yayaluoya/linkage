import { InstanceTool } from "com_utils/InstanceTool";
import { BaseDataProxy } from "../BaseDataProxy";
import { Crypto_ } from "@/utils/Crypto_";

/**
 * 用户数据
 */
@InstanceTool()
export class UserDataProxy extends BaseDataProxy<Partial<EN.IUserE>>{
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

    /**
     * 设置用户数据
     * @param _userData 
     */
    setUserData(_userData: EN.IUserE) {
        let keys: (keyof EN.IUserE)[] = Object.keys(_userData) as any;
        keys.forEach((key) => {
            this.data[key] = _userData[key] as any;
        });
        // console.log(this.data, _userData, keys);
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