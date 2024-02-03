import { Header } from '@nestjs/common';

/**
 * 响应头处理的额外包装
 */
export function HeaderDataHandlePack(value: ComN.dataHandlesType[]) {
  let header: ComN.IDataHandle = {
    'x-data-handles': value,
  };
  return Header(Object.keys(header)[0], JSON.stringify(Object.values(header)[0]));
}
