import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { WHApiCon } from "src/http/apiCon/WHApiCon";
import { ResData } from "src/http/ResData";

/**
 * 图片库wallhaven的相关接口
 */
@Controller('wallhaven')
export class WallhavenC {
    @Get('test')
    async test() {
        return new ResData({
            mes: 'wallhaven模块测试',
        });
    }

    /** 分页查询 */
    @Get('page')
    async page(@Query() query) {
        let list = await WHApiCon.instance.pageQuery(query);
        return new ResData({
            list,
            length: list.length,
            ...query,
        });
    }

    /** 获取图片真实路径 */
    @Get('getImgUrl')
    async getImgUrl(@Query() query) {
        return new ResData(await WHApiCon.instance.getImgUrl(query.url));
    }
}