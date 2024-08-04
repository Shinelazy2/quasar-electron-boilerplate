import { ipcRenderer as ir } from 'electron';
import { ApiResponse } from './apiReponse';

export class ElectronFunctions {
  toggleMaxmizeWindow = () => ir.invoke('toggle-maxmize-window');
  closeWindow = () => ir.invoke('close-window');
  minimizeWindow = () => ir.invoke('minimize-window');
  getDirPath = () => ir.invoke('getDirPath');
  getTest = () => ir.invoke('getTest');
  robotTest = () => ir.invoke('robotTest');
  saveClipboardImage = () => ir.invoke('saveClipboardImage');
  getImages = () => ir.invoke('getImages');

  // item
  registerItemService = (name: string, options: string[], image: string) => ir.invoke('registerItemService', name, options, image);
  compareImage = (itemImage: string, screenshotImage: string) => ir.invoke('compareImage', itemImage, screenshotImage);
}
