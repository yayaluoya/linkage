import { Controller, Get } from '@nestjs/common';
import { ResData } from 'global-module/dist/ResData';
import { ApiService } from './api.service';

@Controller('/api')
export class ApiController {
    constructor(private readonly mianService: ApiService) {}

    @Get('test')
    test() {
        return new ResData(this.mianService.test());
    }
}
