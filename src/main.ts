import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogsInterceptor } from './logs/logs.interceptor';
import { LogsService } from './logs/logs.service';
import { LogsExceptionFilter } from './logs/logs-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    const logsService = app.get(LogsService);
    app.useGlobalInterceptors(new LogsInterceptor(logsService));
    app.useGlobalFilters(new LogsExceptionFilter(logsService));
  await app.listen(3000);
}
bootstrap();
