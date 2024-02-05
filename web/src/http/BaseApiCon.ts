import { AxiosRequestConfig as AxiosRequestConfig_, AxiosResponse } from 'axios';
import { HandleHttpData } from 'global-module/dist_esm/HandleHttpData';
import { BaseApiCon as BaseApiCon_ } from 'yayaluoya-tool/dist/node/BaseApiCon';
import { HttpStatus } from 'yayaluoya-tool/dist/http/HttpStatus';
import { SecretCode } from './SecretCode';
import { ResData } from '../../../dist_esm/ResData';
import { Env } from '@/_d/Env';

/** 自定义的请求op类型 */
interface AxiosRequestConfig<T = any> extends AxiosRequestConfig_<T>, ComN.IDataHandle {}

/**
 * 基类api控制器
 */
export class BaseApiCon extends BaseApiCon_ {
  get op(): AxiosRequestConfig {
    return {
      baseURL: Env.BASE_URL,
      timeout: 1000 * 60 * 5,
    };
  }

  constructor() {
    super();
  }

  getData<D = any>(_op: AxiosRequestConfig) {
    return super.getData<D>(_op);
  }

  postData<D = any>(_op: AxiosRequestConfig) {
    return super.postData<D>(_op);
  }

  putData<D = any>(_op: AxiosRequestConfig) {
    return super.putData<D>(_op);
  }

  deleteData<D = any>(_op: AxiosRequestConfig) {
    return super.deleteData<D>(_op);
  }

  resData_(res: AxiosResponse) {
    let data = res.data as ResData;
    let resData = new ResData(
      data?.data || res.data,
      data?.status || res.status,
      data?.msg || '请求错误',
      data?.timeStamp || Date.now(),
    );
    resData.res = res;
    resData.handleTime = 1;
    if (resData.status != HttpStatus.OK) {
      throw resData;
    }
    return resData;
  }

  protected async request_(config: AxiosRequestConfig) {
    //添加响应头
    if (config['x-data-handles'] && config['x-data-handles'].length > 0) {
      if (config.data) {
        config.data = {
          data: HandleHttpData.handle(config.data, config['x-data-handles']),
        };
      }
      if (config.params) {
        for (let i in config.params) {
          config.params[i] = HandleHttpData.handle(
            config.params[i],
            config['x-data-handles'],
          );
        }
      }
      //把数据处理的流程添加到请求头中
      ((config.headers || ({} as any)) as ComN.IReqHead)['x-data-handles'] =
        JSON.stringify(config['x-data-handles']) as any;
    }
    return SecretCode.setSC(config).then((_) => {
      return _ as any;
    });
  }

  protected async response_(res: AxiosResponse) {
    //解析数据，主要判断数据是否被加密或者压缩
    let handleType = [];
    try {
      handleType = JSON.parse((res.headers as ComN.IDataHandle)['x-data-handles'] as any);
    } catch {}
    res.data = HandleHttpData.handle_(res.data || null, handleType) as ResData;
    //
    return res as any;
  }
}
