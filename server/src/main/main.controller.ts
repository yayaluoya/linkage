import { Controller, Get } from '@nestjs/common';
import { MainService } from './main.service';

@Controller('main')
export class MainController {
  constructor(private readonly mianService: MainService) {}

  @Get()
  getHello(): string {
    return this.mianService.getHello();
  }
}
