import { Module } from "@nestjs/common";
import { EManager } from "db/EManager";
import { ComC } from "./com.controller";

/**
 * 公共模块
 */
@Module({
    imports: [EManager.imports()],
    controllers: [ComC],
})
export class ComModule { }