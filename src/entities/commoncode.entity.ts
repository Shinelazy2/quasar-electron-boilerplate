import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('COMMON_CODE')
export class CommonCodeEntity {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  groupCd: string;

  @PrimaryColumn({ type: 'int' })
  commonCd: number;

  @Column({ type: 'varchar', length: 100 })
  cdName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cdAbbr: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  data1: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  data2: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  data3: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  data4: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  data5: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  data6: string;

  @Column({ type: 'varchar', length: 1 })
  useGb: string;

  @Column({ type: 'varchar', length: 1 })
  targetGb: string;

  @CreateDateColumn({ type: 'datetime' })
  regDt: Date;

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  modDt: Date;
}
