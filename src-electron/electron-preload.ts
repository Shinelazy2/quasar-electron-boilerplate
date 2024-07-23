import { ElectronFunctions } from '@/types/electron.function.type';
import { contextBridge } from 'electron';
const api = new ElectronFunctions();
contextBridge.exposeInMainWorld('api', api);
