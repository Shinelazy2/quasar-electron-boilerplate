import { CommonCode } from './../src/types/commonCode.type';
import { ipcMain as im, dialog, SaveDialogOptions, OpenDialogOptions } from 'electron';
const sqlite = require('aa-sqlite');
const path = require('path');
const fs = require('fs');
const dbPath = process.env.NODE_ENV === 'development' ? process.env.DATABASE_URL : path.join(__dirname, process.env.DATABASE_URL);

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

im.handle('getSourceImageList', async (_, sourcePath: string) => {
  try {
    // 폴더 내의 파일 목록 읽기
    const files = fs.readdirSync(sourcePath);

    const imageFiles = files.filter((file: string) => {
      const filePath = path.join(sourcePath, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) return false;
      const ext = path.extname(file).toLowerCase();
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif') {
        return true;
      }
      return false;
    });

    return imageFiles;
  } catch (error) {
    console.error('Error occurred while reading source image list:', error);
    return []; // 에러가 발생하면 빈 배열 반환
  }
});

im.handle('copyImage', async (_, sourcePath: string, targetPath: string) => {
  try {
    await fs.copyFileSync(sourcePath, targetPath);
    // await fs.promises.copyFile(sourcePath, targetPath); // 비동기 복사로 변경

    return true;
  } catch (error) {
    console.error('Error occurred while reading source image list:', error);
    return false;
  }
});

im.handle('getCommonCode', async (_, groupCd: number) => {
  try {
    await sqlite.open(dbPath);

    const query = `
        SELECT
           GROUP_CD
          ,COMMON_CD
          ,CD_NAME
          ,CD_ABBR
          ,DATA_1
          ,DATA_2
          ,USE_GB
        FROM COMMON_CODE
        WHERE GROUP_CD = ${groupCd} AND USE_GB = 'Y'
      `;
    console.log('🚀 ~ file: ipcDB.ts:99 ~ im.handle ~ query:', query);
    const data = await sqlite.get_all(query, []);
    return data;
  } catch (error: unknown) {
    console.log('🚀 ~ im.handle ~ error:', error);
  }
});

im.handle('setCommonCode', async (_, groupCd: number, cdAbbr: string, data1: string) => {
  try {
    await sqlite.open(dbPath);

    const query = `
        UPDATE COMMON_CODE
        SET DATA_1 = '${data1}'
        WHERE GROUP_CD = ${groupCd} AND CD_ABBR = '${cdAbbr}'
      `;
    const data = await sqlite.get_all(query, []);
    return data;
  } catch (error: unknown) {
    console.log('🚀 ~ im.handle ~ error:', error);
  }
});
im.handle('transferSpeed', async (_, groupCd: number, cdAbbr: string, data1: string) => {
  try {
    await sqlite.open(dbPath);

    const query = `
        UPDATE COMMON_CODE
        SET DATA_1 = '${data1}'
        WHERE GROUP_CD = ${groupCd} AND CD_ABBR = '${cdAbbr}'
      `;
    const data = await sqlite.get_all(query, []);
    return data;
  } catch (error: unknown) {
    console.log('🚀 ~ im.handle ~ error:', error);
  }
});
