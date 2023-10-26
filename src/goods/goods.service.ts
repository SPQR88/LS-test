import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Goods } from './entities/goods.entity';
import { Placements } from '../placement/entities/placements.entity';
import { Sections } from '../sections/entities/sections.entity';
import { AddGoodsItemDto } from './dto/add-goods-item.dto';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private goodsRepository: Repository<Goods>,
    @InjectRepository(Placements)
    private placementsRepository: Repository<Placements>,
    @InjectRepository(Sections)
    private sectionsRepository: Repository<Sections>,
  ) {}

  private async getGoodSectionPlacement(goodTitle: string, location:string): Promise<{good: Goods, section: Sections, placement: Placements | null}> {
    // finding good
    const good = await this.goodsRepository.findOne({ where: { title: goodTitle } });

    if (!good) {
      throw new NotFoundException(`Good with name ${goodTitle} not found`);
    }

    // get rackName and sectionName
    const [rackName, sectionName] = location.split('-');

    // finding section
    const section = await this.sectionsRepository
      .createQueryBuilder('sections')
      .innerJoinAndSelect('sections.racks', 'racks')
      .where('sections.title = :sectionName', { sectionName })
      .andWhere('racks.title = :rackName', { rackName })
      .getOne();

    if (!section) {
      throw new NotFoundException(`Location with rack ${rackName} and section ${sectionName} not found`);
    }

    // finding placemt
    const placement = await this.placementsRepository
      .createQueryBuilder('placements')
      .where('placements.good_id = :goodId AND placements.section_id = :sectionId', {
        goodId: good.id,
        sectionId: section.id
      })
      .getOne();

    return { good, section, placement };
  }

  // get quantity
  async getQuantity(location: string, goodTitle: string): Promise<object> {
    let data = await this.getGoodSectionPlacement(goodTitle, location);

    if (!data.placement) {
      throw new NotFoundException(`Good with name ${goodTitle} not found in location ${location}`);
    }

    return {quantity: data.placement.quantity};
  }

  // Find locations
  async findLocations(goodTitle: string, quantity: number): Promise<any[]> {
    const good = await this.goodsRepository.findOne({
      where: { title: goodTitle },
      relations: ['placements', 'placements.sections', 'placements.sections.racks']
    });

    if (!good) {
        throw new NotFoundException(`Good with name ${goodTitle} not found`);
    }

    const totalQuantity = good.placements.reduce((res, placement) => {
      return res + placement.quantity;
    }, 0);

    if (quantity > totalQuantity) {
      throw new NotFoundException(`Good with name ${goodTitle} has not enough quantity. Total quantity: ${totalQuantity}`);
    }

    let resultLocations = [];
    good.placements.forEach(placement => {
      if (quantity > 0) {
        let setQuantity = quantity > placement.quantity ? placement.quantity : quantity;

        resultLocations.push({
          location: `${placement.sections.racks.title}-${placement.sections.title}`,
          quantity: +setQuantity,
        });
        quantity -= setQuantity;
      }
    });

    return resultLocations;
  }

  // Adding goods
  async addGoods(items: AddGoodsItemDto[]): Promise<object> {
    let result: {good: Goods, section: Sections, placement: Placements | null, quantity: number}[] = [];

    // validation
    for (const item of items) {
      let data = await this.getGoodSectionPlacement(item.good, item.location);

      result.push({ good: data.good, section: data.section, placement: data.placement, quantity: item.quantity });
    }

    for (const item of result) {
      if (item.placement) {
        item.placement.quantity += item.quantity;
        await this.placementsRepository.save(item.placement);
      } else {
        const newPlacement = new Placements();
        newPlacement.goods = item.good;
        newPlacement.sections = item.section;
        newPlacement.quantity = item.quantity;
        await this.placementsRepository.save(newPlacement);
      }
    }

    return {
      success: true,
      message: 'Goods were successfully added'
    };
  }

  // write-off of goods 
  async writeOffGoods(items: AddGoodsItemDto[]) {
    let result: {good: Goods, section: Sections, placement: Placements, quantity: number}[] = [];

    // validation
    for (const item of items) {
      let data = await this.getGoodSectionPlacement(item.good, item.location);

      if (data.placement) {
        if (item.quantity > data.placement.quantity) {
          throw new NotFoundException(`Not enough Good with name ${item.good} in location ${item.location}`);
        }
      } else {
        throw new NotFoundException(`Good with name ${item.good} not found in location ${item.location}`);
      }

      result.push({ good: data.good, section: data.section, placement: data.placement, quantity: item.quantity });
    }

    for (const item of result) {
      if (item.placement) {
        if (item.quantity === item.placement.quantity) {
          await this.placementsRepository.delete(item.placement);
        } else {
          item.placement.quantity -= item.quantity;
          await this.placementsRepository.save(item.placement);
        }        
      }
    }

    return {
      success: true,
      message: 'Goods were successfully write-off'
    };
  }
}
