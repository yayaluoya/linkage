import isColor from 'is-color';
import { isUrl } from 'yayaluoya-tool/dist/is';

/**
 * 公共验证
 */
export class ComVerify {
  /**
   * 颜色验证
   * @param _str
   * @param _title
   * @returns
   */
  static colorV(_str: string, _title: string): string {
    return isColor(_str) ? '' : `${_title}必须是正确的颜色值`;
  }

  /**
   * 长度验证
   * @param _str
   * @param _g
   * @param _title
   */
  static lengthV(_str: string, _g: [number, number], _title: string): string {
    if (_str.length < _g[0]) {
      if (_g[0] == 1) {
        return `${_title}不能为空`;
      }
      return `${_title}长度不能少于${_g[0]}个字符`;
    }
    if (_str.length > _g[1]) {
      return `${_title}长度不能超过${_g[1]}个字符`;
    }
    return '';
  }

  /**
   *
   * @param _str 路径验证
   */
  static urlV(_str: string): string {
    if (isUrl(_str)) {
      return '';
    }
    return '路径格式有误';
  }
}
