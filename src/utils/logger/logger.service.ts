import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  private colorize(
    message: string,
    color: 'green' | 'red' | 'yellow' | 'cyan' | 'gray',
  ): string {
    const colors = {
      green: '\u001b[32m',
      red: '\u001b[31m',
      yellow: '\u001b[33m',
      cyan: '\u001b[36m',
      gray: '\u001b[90m',
    };

    return `${colors[color]}${message}\u001b[0m`;
  }

  log(message: string, ...optionalParams: unknown[]): void {
    console.log(
      this.colorize(`==> [LOG] ${message}`, 'green'),
      ...optionalParams,
    );
  }

  error(message: string, ...optionalParams: unknown[]): void {
    console.error(
      this.colorize(`==> [ERROR] ${message}`, 'red'),
      ...optionalParams,
    );
  }

  warn(message: string, ...optionalParams: unknown[]): void {
    console.warn(
      this.colorize(`==> [WARN] ${message}`, 'yellow'),
      ...optionalParams,
    );
  }

  debug(message: string, ...optionalParams: unknown[]): void {
    console.debug(
      this.colorize(`==> [DEBUG] ${message}`, 'cyan'),
      ...optionalParams,
    );
  }

  verbose(message: string, ...optionalParams: unknown[]): void {
    console.log(
      this.colorize(`==> [VERBOSE] ${message}`, 'gray'),
      ...optionalParams,
    );
  }
}
