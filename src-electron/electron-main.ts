import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron';
import path from 'path';
import os from 'os';
import './ipcMain';
import { DataSource } from 'typeorm';
import { TestEntity } from '@/entities/test.entity';
import { CommonCodeEntity } from '@/entities/commoncode.entity';
export let dataSource: DataSource; // Export the dataSource

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) {}

let mainWindow: BrowserWindow | undefined | any;

async function createWindow() {
  const url =
    process.env.DATABASE_URL !== undefined ? process.env.DATABASE_URL : 'error';
  const dbPath =
    process.env.NODE_ENV === 'development' ? url : path.join(__dirname, url);
  dataSource = new DataSource({
    type: 'sqlite',
    synchronize: true,
    logging: 'all',
    database: dbPath,
    entities: [TestEntity, CommonCodeEntity],
    // entities: [path.join(__dirname, '../../src/entity/*.entity.{ts,js}')],
    // migrations: ['./migrations/*.js'],
  });
  await dataSource
    .initialize()
    .then(() => {
      console.info('Data source has been initialized.');
    })
    .catch((error) => {
      console.info('Error during Data Source initialization:', error);
    });

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1920,
    height: 1080,
    autoHideMenuBar: true,
    useContentSize: true,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      webSecurity: false,
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
