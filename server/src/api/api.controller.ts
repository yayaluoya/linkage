import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly mianService: ApiService) { }

  @Get()
  getHello(): string {
    return this.mianService.getHello();
  }
}
