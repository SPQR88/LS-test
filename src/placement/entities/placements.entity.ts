import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne, JoinColumn
} from 'typeorm';
import { Goods } from '../../goods/entities/goods.entity';
import { Sections } from '../../sections/entities/sections.entity';

@Entity('placements')
export class Placements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int'})
  quantity: number;

  @ManyToOne(() => Goods, good => good.placements)
  @JoinColumn({ name: 'good_id', referencedColumnName: 'id' })
  goods: Goods;

  @ManyToOne(() => Sections, section => section.placements)
  @JoinColumn({ name: 'section_id', referencedColumnName: 'id' })
  sections: Sections;
}
