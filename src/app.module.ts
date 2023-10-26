import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RacksModule } from './racks/racks.module';
import { join } from 'path';
import { GoodsModule } from './goods/goods.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "db",
      "port": 3306,
      "username": "user",
      "password": "123456",
      "database": "lucy",
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      // "synchronize": true
    }),
    RacksModule,
    GoodsModule,
    LogsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
