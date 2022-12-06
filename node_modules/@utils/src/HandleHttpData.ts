import { Gzip } from "./Zip";
import { CryptoI } from "./CryptoI";

/**
 * 处理http的数据
 */
export class HandleHttpData {
    /** 
     * 处理数据
     */
    static handle<T = any>(_data: T, _handType: ComN.dataHandlesType[] = []): T {
        //克隆一个新的数组，防止污染
        _handType = [..._handType];
        try {
            //遍历处理类型
            for (let o of _handType) {
                switch (o) {
                    case 'e':
                        _data = CryptoI.instance.encryptionData(JSON.stringify(_data)) as any;
                        break;
                    case 'z':
                        _data = JSON.stringify(Gzip.gzip(JSON.stringify(_data))) as any;
                        break;
                    case 'o':
                        _data = JSON.stringify(_data).split('').reverse().join('') as any;
                        break;
                }
            }
        }
        catch (e) {
            // console.log('处理数据错误', e);
        }
        return _data;
    }

    /** 
     * 解析数据
     */
    static handle_<T = any>(_data: T, _handType: ComN.dataHandlesType[] = []): T {
        //克隆一个新的数组，防止污染
        _handType = [..._handType];
        try {
            for (let o of _handType.reverse()) {
                switch (o) {
                    case 'e':
                        _data = JSON.parse(CryptoI.instance.decryptionData(_data as any));
                        break;
                    case 'z':
                        _data = JSON.parse(Gzip.ungzip(JSON.parse(_data as any)) as string);
                        break;
                    case 'o':
                        _data = JSON.parse((_data as any).split('').reverse().join(''));
                        break;
                }
            }
        }
        catch (e) {
            // console.log('解析数据错误', e, _data);
        }
        return _data;
    }
}