import {
  ipcMain as im,
  dialog,
  SaveDialogOptions,
  OpenDialogOptions,
  clipboard,
} from 'electron';
import { TestRepository } from './repositories/test.repository';
import { clickAt, findImageOnScreen } from './functions/robots-test';
import { ImageEntity } from '@/entities/image.entity';
import { ImageRepository } from './repositories/image.repository';
const sqlite = require('aa-sqlite');
const path = require('path');
// import * as cv from 'opencv4nodejs';

const dbPath =
  process.env.NODE_ENV === 'development'
    ? process.env.DATABASE_URL
    : path.join(__dirname, process.env.DATABASE_URL);

console.log('🚀 ~ process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('🚀 ~ dbPath:', dbPath);

im.handle('getDirPath', async () => {
  const options: OpenDialogOptions = {
    properties: ['openDirectory'],
  };
  const r = await dialog.showOpenDialog(options);
  if (!r.filePaths.length) throw Error('cancel');
  return r.filePaths[0];
});

im.handle('robotTest', async (_) => {
  // findImageOnScreen();
  // clickAt();
});

im.handle('saveClipboardImage', async () => {
  const imageRepositry = new ImageRepository();

  const image = clipboard.readImage();
  const imageBuffer = image.toPNG(); // 이미지를 PNG 형식으로 변환하여 버퍼로 저장

  const newImage = new ImageEntity();
  newImage.data = imageBuffer;
  imageRepositry.saveClipboardImage(newImage);

  return 'Image saved successfully.';
});

im.handle('getImages', async (): Promise<ImageEntity[]> => {
  try {
    const imageRepositry = new ImageRepository();

    const images = await imageRepositry.getImages();
    return images.map((image: ImageEntity) => ({
      id: image.id,
      data: image.data.toString('base64'),
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
});
