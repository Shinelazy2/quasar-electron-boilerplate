import { ElectronPreload } from '@/types';
import { contextBridge } from 'electron';
const api = new ElectronPreload();
contextBridge.exposeInMainWorld('api', api);
