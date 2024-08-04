import cv from '@techstark/opencv-js';
import { ItemEntity } from '@/entities/item.entity';
import { ItemRepository } from 'src-electron/repositories/item.repository';

export class ItemService {
  registerItem = async (itemName: string, itemOptions: string, imageData: string) => {
    const itemRepo = new ItemRepository();
    const item = new ItemEntity();
    item.name = itemName;
    item.options = JSON.parse(itemOptions);
    item.image = Buffer.from(imageData, 'base64');

    await itemRepo.saveItem(item);
  };

  compareImage = async (imageImage: string, screenshotBuffer: string) => {
    const itemImage = cv.imread(imageImage);
    const screenshot = cv.imread(screenshotBuffer);
    const matched = new cv.Mat();

    cv.matchTemplate(screenshot, itemImage, matched, cv.TM_CCOEFF_NORMED);

    // const matched = itemImage.matchTemplate(screenshot, cv.TM_CCOEFF_NORMED);
    // 최댓값과 위치 찾기
    const minVal = new cv.Scalar();
    console.log('🚀 ~ ItemService ~ compareImage= ~ minVal:', minVal);
    const maxVal = new cv.Scalar();
    console.log('🚀 ~ ItemService ~ compareImage= ~ maxVal:', maxVal);
    const minLoc = new cv.Point(0, 0);
    console.log('🚀 ~ ItemService ~ compareImage= ~ minLoc:', minLoc);
    const maxLoc = new cv.Point(0, 0);
    console.log('🚀 ~ ItemService ~ compareImage= ~ maxLoc:', maxLoc);

    cv.minMaxLoc(matched, minVal, maxVal, minLoc, maxLoc);

    // 메모리 해제
    itemImage.delete();
    screenshot.delete();
    matched.delete();

    return { matchValue: maxVal, matchLocation: maxLoc };
  };
}
