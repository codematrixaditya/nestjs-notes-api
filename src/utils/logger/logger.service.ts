import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import chalk from 'chalk';

@Injectable()
export class LoggerService implements NestLoggerService {
  log(message: string, ...optionalParams: unknown[]): void {
    console.log(`${chalk.green(`==> [LOG] ${message}`)}`, ...optionalParams);
  }

  error(message: string, ...optionalParams: unknown[]): void {
    console.error(`${chalk.red(`==> [ERROR] ${message}`)}`, ...optionalParams);
  }

  warn(message: string, ...optionalParams: unknown[]): void {
    console.warn(`${chalk.yellow(`==> [WARN] ${message}`)}`, ...optionalParams);
  }

  debug(message: string, ...optionalParams: unknown[]): void {
    console.debug(`${chalk.cyan(`==> [DEBUG] ${message}`)}`, ...optionalParams);
  }

  verbose(message: string, ...optionalParams: unknown[]): void {
    console.log(`${chalk.gray(`==> [VERBOSE] ${message}`)}`, ...optionalParams);
  }
}
