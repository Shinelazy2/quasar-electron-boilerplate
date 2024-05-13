import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron';
import path from 'path';
import os from 'os';
import './ipcMain';
const fs = require('fs');

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'));
  }
} catch (_) {}

let mainWindow: BrowserWindow | undefined | any;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 800,
    height: 630,
    autoHideMenuBar: true,
    useContentSize: true,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      webSecurity: false,
      backgroundThrottling: false,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
  ipcMain.handle('minimize-window', (event) => {
    // console.log('isMinimized : ', mainWindow.isMinimized())
    if (!mainWindow.isMinimized()) {
      mainWindow.minimize();
    }
  });
  ipcMain.handle('toggle-maxmize-window', (event) => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
  ipcMain.handle('close-window', (event) => {
    mainWindow = null;
    app.quit();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});
