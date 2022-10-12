import { Controller, Get } from '@nestjs/common';
import { ResData } from '@utils/ResData';

@Controller('time')
export class TimeController {

  @Get('getTime')
  getTime(): ResData {
    return new ResData(Date.now());
  }
}
