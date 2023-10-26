import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Racks } from './entities/racks.entity';

@Injectable()
export class RacksService {
  constructor(
    @InjectRepository(Racks)
    private racksRepository: Repository<Racks>,
  ) {}

  findAll(): Promise<Racks[]> {
    return this.racksRepository.find();
  }
}
