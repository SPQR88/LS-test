import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { Goods } from './entities/goods.entity';
import { Placements } from '../placement/entities/placements.entity';
import { Sections } from '../sections/entities/sections.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Goods, Placements, Sections])],
  providers: [GoodsService],
  controllers: [GoodsController],
  exports: [GoodsService],
})
export class GoodsModule {}
