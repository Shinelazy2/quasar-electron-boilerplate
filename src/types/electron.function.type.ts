import { ipcRenderer as ir } from 'electron';
import { ApiResponse } from './apiReponse';

export class ElectronFunctions {
  toggleMaxmizeWindow = () => ir.invoke('toggle-maxmize-window');
  closeWindow = () => ir.invoke('close-window');
  minimizeWindow = () => ir.invoke('minimize-window');
  getDirPath = () => ir.invoke('getDirPath');
  getTest = () => ir.invoke('getTest');
}
