import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('logs')
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @Column()
  url: string;

  @Column({ type: 'text' })
  request: string;

  @Column({ type: 'text' })
  response: string;

  @Column()
  status: number;
}