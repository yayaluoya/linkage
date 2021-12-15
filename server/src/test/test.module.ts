import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestEntity } from "src/db/entities/TestEntity";
import { TestController } from "./test.controller";

@Module({
    imports: [
        //引入测试表
        TypeOrmModule.forFeature([TestEntity])
    ],
    controllers: [TestController],
    providers: [],
})
export class TestModule { }