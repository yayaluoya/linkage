import { confusionStr } from 'global-module/dist_esm/confusionStr';

/** 一个混淆颜值 */
const iv = 'fasdfaewrqwerasdfasdfa';

/**
 * 获取混淆查询参数
 * @param _string
 */
export function getObscureQueryValue(
  _string: string | undefined | null,
): string | undefined {
  if (!_string) {
    return undefined;
  }
  let _strs = _string?.split('-');
  if (_strs.length != 2) {
    return undefined;
  }
  if (_strs[1] != confusionStr(`${_strs[0]}-${iv}`)) {
    return undefined;
  }
  return _strs[0];
}

/**
 * 获取混淆字符串
 * @param _string
 * @returns
 */
export function getObscureQueryStr(_string: string): string {
  return `${_string}-${confusionStr(`${_string}-${iv}`)}`;
}
