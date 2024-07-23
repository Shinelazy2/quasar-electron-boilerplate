import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('TEST')
export class TestEntity {
  @PrimaryGeneratedColumn()
  SEQ: number;

  @Column({ type: 'integer', nullable: true })
  ID: number;
}
