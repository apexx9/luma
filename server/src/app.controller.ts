import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Inject } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('DRIZZLE') private readonly db: any,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/health')
  async getHealth() {
    const startTime = Date.now();

    try {
      // Test database connectivity with a simple ping
      if (this.db && typeof this.db.execute === 'function') {
        await this.db.execute('SELECT 1');
      }

      const responseTime = Date.now() - startTime;

      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: Math.floor(process.uptime()),
        responseTime: `${responseTime}ms`,
        services: {
          database: 'connected',
          server: 'running',
        },
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0',
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
          total:
            Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB',
        },
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;

      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        uptime: Math.floor(process.uptime()),
        responseTime: `${responseTime}ms`,
        services: {
          database: 'disconnected',
          server: 'running',
        },
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0',
        error: error instanceof Error ? error.message : 'Unknown error',
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
          total:
            Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB',
        },
      };
    }
  }

  @Get('api/health/simple')
  getSimpleHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
