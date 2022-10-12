import { Module } from "@nestjs/common";
import { WebC } from "./web.controller";

/**
 * web模块
 */
@Module({
    imports: [],
    controllers: [WebC],
})
export class WebModule { }