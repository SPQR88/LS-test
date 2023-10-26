import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logs } from './entities/logs.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Logs)
    private logRepository: Repository<Logs>,
  ) {}

  async createLog(method: string, url: string, request: any, response: any, status: number) {
    const log = this.logRepository.create({
      method,
      url,
      request: JSON.stringify(request),
      response: response ? JSON.stringify(response) : "Error response not yet generated",
      status,
    });

    await this.logRepository.save(log);
  }
}