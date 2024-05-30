import { ipcRenderer as ir } from 'electron';

export class ElectronPreload {
  toggleMaxmizeWindow = () => ir.invoke('toggle-maxmize-window');
  closeWindow = () => ir.invoke('close-window');
  minimizeWindow = () => ir.invoke('minimize-window');
  getDirPath = () => ir.invoke('getDirPath');
  getCommonCode = () => ir.invoke('getCommonCode');
  typeormTest = async () => await ir.invoke('typeormTest');
  typeormInsertTest = async (content: string) =>
    await ir.invoke('typeormInsertTest', content);
}
