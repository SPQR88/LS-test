import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { SectionsService } from './sections.service';
// import { SectionsController } from './sections.controller';
import { Sections } from './entities/sections.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sections])],
  providers: [/*SectionsService*/],
  controllers: [/*SectionsController*/],
  exports: [/*ectionsService*/]
})
export class SectionsModule {}
