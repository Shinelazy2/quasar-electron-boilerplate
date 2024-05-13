import { ipcRenderer as ir } from 'electron';
import { ApiResponse } from './apiReponse.type';
import { CommonCode } from './commonCode.type';
import fs from 'fs';

export class ElectronPreload {
  toggleMaxmizeWindow = () => ir.invoke('toggle-maxmize-window');
  closeWindow = () => ir.invoke('close-window');
  minimizeWindow = () => ir.invoke('minimize-window');
  getDirPath = () => ir.invoke('getDirPath');
  getSourceImageList = (sourcePath: string): Promise<string[]> => ir.invoke('getSourceImageList', sourcePath);
  getCommonCode = (groupCd: number): Promise<ApiResponse<CommonCode>> => ir.invoke('getCommonCode', groupCd);
  setCommonCode = (groupCd: number, cdAbbr: string, data1: string): Promise<ApiResponse<unknown>> =>
    ir.invoke('setCommonCode', groupCd, cdAbbr, data1);
  copyImage = (sourcePath: string, targetPath: string): Promise<boolean> => ir.invoke('copyImage', sourcePath, targetPath);
  // copyImage = async (sourcePath: string, targetPath: string) => {
  //   ir.once('copyImage', async () => {
  //     try {
  //       // fs.copyFileSync(sourcePath, targetPath);
  //       // await fs.promises.copyFile(sourcePath, targetPath); // 비동기 복사로 변경

  //       return true;
  //     } catch (error) {
  //       console.error('Error occurred while reading source image list:', error);
  //       return false;
  //     }
  //   });
  // };
}
