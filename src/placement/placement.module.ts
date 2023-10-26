import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { PlacementsService } from './placements.service';
// import { PlacementsController } from './placements.controller';
import { Placements } from './entities/placements.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Placements])],
  providers: [/*PlacementsService*/],
  controllers: [/*PlacementsController*/],
  exports: [/*PlacementsService*/]
})
export class PlacementsModule {}
