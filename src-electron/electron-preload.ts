import { ElectronPreload } from '@/types';
const api = new ElectronPreload
import { contextBridge } from 'electron'
contextBridge.exposeInMainWorld('api', api)