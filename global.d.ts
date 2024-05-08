import { ElectronPreload } from '@/types';

declare global {
  interface Window {
    api: ElectronPreload;
  }
}
export {};
