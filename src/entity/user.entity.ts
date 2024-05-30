import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('USER')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  loginId: string;

  @Column('text', { nullable: true })
  nickName: string;

  @Column('text')
  provider!: string;

  @Column('text', { nullable: true })
  password: string;

  @Column('text', {
    nullable: true,
  })
  hashedRt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
