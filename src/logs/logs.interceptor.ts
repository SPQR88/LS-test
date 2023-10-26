import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogsService } from './logs.service';

@Injectable()
export class LogsInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const { method, url, body: requestBody } = httpContext.getRequest();
    const res = httpContext.getResponse();

    return next
      .handle()
      .pipe(
        tap(responseBody => {
          const { statusCode } = res;
          this.logService.createLog(method, url, requestBody, responseBody, statusCode);
        }),
      );
  }
}
