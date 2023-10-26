import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';
import { Racks } from '../../racks/entities/racks.entity';
import { Placements } from '../../placement/entities/placements.entity';

@Entity('sections')
export class Sections {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ManyToOne(() => Racks, rack => rack.sections)
  @JoinColumn({ name: 'rack_id', referencedColumnName: 'id' })
  racks: Racks;

  @OneToMany(() => Placements, placement => placement.sections)
  placements: Placements[];
}
