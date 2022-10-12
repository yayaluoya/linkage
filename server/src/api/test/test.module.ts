import { Module } from "@nestjs/common";
import { EManager } from "db/EManager";
import { TestEntity } from "db/entities/TestEntity";
import { TestController } from "./test.controller";

@Module({
    imports: [
        EManager.imports(TestEntity),
    ],
    controllers: [TestController],
    providers: [],
})
export class TestModule { }