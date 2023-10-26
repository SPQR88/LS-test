import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { AddGoodsItemDto } from './dto/add-goods-item.dto';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @Get('locations')
  async findLocations(
    @Query('good') good: string,
    @Query('quantity') quantity: number
  ) {
    return this.goodsService.findLocations(good, quantity);
  }

  @Get('quantity')
  async getQuantity(
    @Query('location') location: string,
    @Query('good') good: string
  ) {
    return this.goodsService.getQuantity(location, good);
  }

  @Post('add')
  async addGoods(@Body() items: AddGoodsItemDto[]) {
    return this.goodsService.addGoods(items);
  }

  @Post('writeoff')
  async writeOff(@Body() items: AddGoodsItemDto[]) {
    return this.goodsService.writeOffGoods(items);
  }
}
