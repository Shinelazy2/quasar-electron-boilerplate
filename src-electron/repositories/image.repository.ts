import { DataSource } from 'typeorm';
import { dataSource } from 'src-electron/electron-main';
import dayjs from 'dayjs';
import { TestEntity } from '@/entities/test.entity';
import { ImageEntity } from '@/entities/image.entity';

export class ImageRepository {
  private imageRepository;

  constructor() {
    this.imageRepository = dataSource.getRepository(ImageEntity);
  }

  async saveClipboardImage(newImage: ImageEntity) {
    const query = await this.imageRepository.save(newImage);
  }
  async getImages() {
    const images = await this.imageRepository
      .createQueryBuilder()
      .select()
      .getMany();
    return images;
  }
}
