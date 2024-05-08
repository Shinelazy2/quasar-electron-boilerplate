import {
  ipcMain as im,
  dialog,
  SaveDialogOptions,
  OpenDialogOptions,
} from 'electron';

im.handle('getDirPath', async () => {
  const options: OpenDialogOptions = {
    properties: ['openDirectory'],
  };
  const r = await dialog.showOpenDialog(options);
  if (!r.filePaths.length) throw Error('cancel');
  return r.filePaths[0];
});
