import { Catch, ArgumentsHost, HttpException, ExceptionFilter, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { LogsService } from './logs.service';

@Catch()
export class LogsExceptionFilter implements ExceptionFilter {
  constructor(private readonly logsService: LogsService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: any = ctx.getResponse<Response>();
    const request: any = ctx.getRequest<Request>();
    const status = exception.getStatus ? exception.getStatus() : 500;

    const originalResponse = exception.getResponse();
    
    await this.logsService.createLog(
      request.method,
      request.url,
      request.body,
      originalResponse,
      status
    );

    // send original response
    response
      .status(status)
      .json(originalResponse);
  }
}
