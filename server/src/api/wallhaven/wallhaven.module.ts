import { Module } from "@nestjs/common";
import { WallhavenC } from "./wallhaven.controller";

/**
 * 图片库Wallhaven处理模块
 */
@Module({
    imports: [],
    controllers: [WallhavenC],
})
export class WallhavenModule { }