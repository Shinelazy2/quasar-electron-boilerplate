import { ipcRenderer as ir } from 'electron';

export class ElectronPreload {
  toggleMaxmizeWindow = () => ir.invoke('toggle-maxmize-window');
  closeWindow = () => ir.invoke('close-window');
  minimizeWindow = () => ir.invoke('minimize-window');
  getDirPath = () => ir.invoke('getDirPath');
  getCommonCode = (codeNumber: number) =>
    ir.invoke('getCommonCode', codeNumber);
}
