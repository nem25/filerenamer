const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    }
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('rename-file', (event, oldPath, newName) => {
  const oldName = path.basename(oldPath);
  const newPath = path.join(path.dirname(oldPath), newName);
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      event.reply('rename-file-response', `Error renaming file: ${err.message}`);
    } else {
      event.reply('rename-file-response', `File "${oldName}" renamed successfully to "${newName}"`);
    }
  });
});
