import { Controller, Get } from '@nestjs/common';
import { RacksService } from './racks.service';
import { Racks } from './entities/racks.entity';

@Controller('racks')
export class RacksController {
  constructor(private readonly racksService: RacksService) {}

  @Get()
  findAll(): Promise<Racks[]> {
    return this.racksService.findAll();
  }
}
