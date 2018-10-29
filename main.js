/**
 * Starts the desktop application through the electron framework.
 * This file is not part of the curriculum, and does not need to be altered.
 */

const electron = require('electron');
const path = require('path');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

const app = electron.app;

// See https://github.com/electron/electron/issues/22119
// Should be fixed in https://github.com/electron/electron/pull/25869,
// though these changes are not released yet (14.10.20)
app.allowRendererProcessReuse = false;

const BrowserWindow = electron.BrowserWindow;

// Reload application on changes in src folder
require('electron-reload')(path.join(__dirname, 'src'), {
  electron: path.join(__dirname, 'node_modules/.bin/electron'),
  ignored: /^.*\.(json|txt)$/,
});

let mainWindow;
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true },
  });

  // Open Development Tools
  mainWindow.openDevTools();

  mainWindow.loadURL('file://' + __dirname + '/src/index.html');
});

app.on('window-all-closed', () => {
  app.quit();
});
