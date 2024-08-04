import { ItemEntity } from './../../src/entities/item.entity';
import { DataSource } from 'typeorm';
import { dataSource } from 'src-electron/electron-main';
import dayjs from 'dayjs';
import { TestEntity } from '@/entities/test.entity';
import { ImageEntity } from '@/entities/image.entity';

export class ItemRepository {
  private itemRepository;

  constructor() {
    this.itemRepository = dataSource.getRepository(ItemEntity);
  }

  async saveItem(item: ItemEntity) {
    const images = await this.itemRepository.save(item);
    return images;
  }

  async create(item: ItemEntity | any) {
    await this.itemRepository.create(item);
  }
}
