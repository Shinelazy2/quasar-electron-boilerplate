import { ElectronPreload } from './src/types/Electron.preload';

declare global {
  interface Window {
    api: ElectronPreload
  }
}
export {}