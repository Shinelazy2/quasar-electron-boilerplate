import {
  ipcMain as im,
  dialog,
  SaveDialogOptions,
  OpenDialogOptions,
} from 'electron';
import { dataSource } from './electron-main';
import { User } from '@/entity/user.entity';

im.handle('getDirPath', async () => {
  const options: OpenDialogOptions = {
    properties: ['openDirectory'],
  };
  const r = await dialog.showOpenDialog(options);
  if (!r.filePaths.length) throw Error('cancel');
  return r.filePaths[0];
});

im.handle('typeormTest', async (_) => {
  const test = await dataSource.getRepository(User).findBy({});
  return test;
});

im.handle('typeormInsertTest', async (_, content: string) => {
  const test = await dataSource.getRepository(User).insert({
    loginId: content,
    nickName: 'asd',
    provider: 'asd',
    password: 'asd',
    hashedRt: 'asd',
  });
  return test;
});
