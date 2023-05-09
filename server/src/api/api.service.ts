import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
    test(): string {
        return 'api测试';
    }
}
