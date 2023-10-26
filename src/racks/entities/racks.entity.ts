import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sections } from '../../sections/entities/sections.entity';

@Entity('racks')
export class Racks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @OneToMany(() => Sections, section => section.racks)
  sections: Sections[];
}