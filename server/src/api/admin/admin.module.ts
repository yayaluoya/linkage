import { Module } from "@nestjs/common";
import { EManager } from "db/EManager";
import { AdminC } from "./admin.controller";

/**
 * 后台模块
 */
@Module({
    imports: [EManager.imports()],
    controllers: [AdminC],
})
export class AdminModule { }