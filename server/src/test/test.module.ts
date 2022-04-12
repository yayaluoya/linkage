import { Module } from "@nestjs/common";
import { EManager } from "src/db/EManager";
import { TestController } from "./test.controller";

@Module({
    imports: [
        EManager.imports,
    ],
    controllers: [TestController],
    providers: [],
})
export class TestModule { }