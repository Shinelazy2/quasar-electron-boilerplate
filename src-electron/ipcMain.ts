import {
  ipcMain as im,
  dialog,
  SaveDialogOptions,
  OpenDialogOptions,
} from 'electron';
import { TestRepository } from './test.repository';
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

im.handle('getTest', async (_, codeNumber: number) => {
  try {
    const getQuery = new TestRepository();
    const data = getQuery.getTest();
    return data;
  } catch (error: unknown) {
    console.log('🚀 ~ im.handle ~ error:', error);
  }
});
