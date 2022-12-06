import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { readFileSync } from "fs";
import { join } from "path";
import { PathManager } from "pathManager/PathManager";
import { ResData } from "@utils/dist/ResData";
import { CredentialsT } from "utils/AliOssT";

/**
 * 公共模块控制器
 */
@Controller('com')
export class ComC {
    @Get('test')
    async test() {
        return new ResData({
            mes: '公共模块测试',
        });
    }

    @Get('getMdHelp')
    getMdHelp() {
        return new ResData(readFileSync(join(PathManager.dataPath, 'mdHelp.md')).toString());
    }

    @Get('getEmoji')
    getEmoji() {
        return new ResData(readFileSync(join(PathManager.dataPath, 'emoji.json')).toString());
    }

    @Get('getSts')
    async getSts() {
        return CredentialsT.instance.getSts().then((result) => {
            return new ResData(result);
        }).catch((e) => {
            console.log('获取阿里云sts失败', e);
            return new ResData().fail('获取阿里云sts失败');
        });
    }
}