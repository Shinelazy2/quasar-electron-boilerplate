import {
  ipcMain as im,
  dialog,
  SaveDialogOptions,
  OpenDialogOptions,
} from 'electron';
const sqlite = require('aa-sqlite');
const path = require('path');

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

im.handle('getCommonCode', async (_, codeNumber: number) => {
  try {
    await sqlite.open(dbPath);
    const query = `
        SELECT COMMON_CD, DATA_1
        FROM COMMON_CODE
        WHERE GROUP_CD = ${codeNumber} AND USE_GB = 'Y'
      `;
    console.log('🚀 ~ file: ipcDB.ts:99 ~ im.handle ~ query:', query);
    const data = await sqlite.get_all(query, []);
    return data;
  } catch (error: unknown) {
    console.log('🚀 ~ im.handle ~ error:', error);
  }
});
