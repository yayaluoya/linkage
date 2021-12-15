import { Controller, Get } from "@nestjs/common";
import { ResData } from "src/http/ResData";
import { TabRepCon } from "../TabRepCon";

/**
 * 公共模块控制器
 */
@Controller('com')
export class ComC extends TabRepCon {
    @Get('test')
    test() {
        return new ResData('公共模块测试');
    }
}