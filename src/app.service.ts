import { Injectable } from '@nestjs/common';
import { LoggerService } from './utils/logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: LoggerService) {}

  getHello(): { message: string } {
    this.logger.log('AppService getHello called');

    return {
      message: 'Hello World!',
    };
  }
}
