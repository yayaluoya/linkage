import { Module } from "@nestjs/common";
import { TestM } from "db/model/TestM";
import { TestController } from "./test.controller";

@Module({
    imports: [
        TestM,
    ],
    controllers: [TestController],
    providers: [],
})
export class TestModule { }