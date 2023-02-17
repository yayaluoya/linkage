import { Module } from "@nestjs/common";
import { DevC } from "./dev.controller";

/**
 * 公共模块
 */
@Module({
    imports: [],
    controllers: [
        DevC,
    ],
})
export class DevModule { }