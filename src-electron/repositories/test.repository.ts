import { DataSource } from 'typeorm';
import { dataSource } from 'src-electron/electron-main';
import dayjs from 'dayjs';
import { TestEntity } from '@/entities/test.entity';

export class TestRepository {
  private testRepository;

  constructor() {
    this.testRepository = dataSource.getRepository(TestEntity);
  }

  async getTest() {
    const query = this.testRepository.createQueryBuilder().select();

    return await query.getMany();
  }
}
