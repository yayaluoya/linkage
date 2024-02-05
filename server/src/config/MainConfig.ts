import { ServerConfig } from 'global-module/dist/ServerConfig';
import { statSync, readFileSync } from 'fs';
import { PathManager } from 'pathManager/PathManager';
import { join } from 'path';
import { ObjectUtils } from 'yayaluoya-tool/dist/obj/ObjectUtils';
import { JSONPar } from 'yayaluoya-tool/dist/JSONPar';

/**
 * 主配置
 */
export class MainConfig extends ServerConfig {
  //
}

if (
  statSync(join(PathManager.localDataPath, './server.config.json'), {
    throwIfNoEntry: false,
  })?.isFile()
) {
  ObjectUtils.merge(
    MainConfig,
    JSONPar(
      readFileSync(join(PathManager.localDataPath, './server.config.json')).toString(),
      {},
    ),
  );
}
