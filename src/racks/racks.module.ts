import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RacksService } from './racks.service';
import { RacksController } from './racks.controller';
import { Racks } from './entities/racks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Racks])],
  providers: [RacksService],
  controllers: [RacksController],
})
export class RacksModule {}