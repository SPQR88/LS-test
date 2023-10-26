import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { Placements } from '../../placement/entities/placements.entity';

@Entity('goods')
export class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @OneToMany(() => Placements, placement => placement.goods)
  placements: Placements[];
}
