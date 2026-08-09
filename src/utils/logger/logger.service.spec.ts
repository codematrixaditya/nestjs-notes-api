import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  it('should be defined', () => {
    const service = new LoggerService();

    expect(service).toBeDefined();
  });

  it('should log a message without throwing', () => {
    const service = new LoggerService();

    expect(() => service.log('hello from logger')).not.toThrow();
  });
});
