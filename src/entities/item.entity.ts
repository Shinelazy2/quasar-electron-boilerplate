import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text' }) // 명시적으로 타입 정의
  name!: string;

  @Column({ type: 'simple-json' })
  options!: string[];

  @Column({ type: 'blob' })
  image!: Buffer | string; // 이미지 버퍼 형태로 저장
}
