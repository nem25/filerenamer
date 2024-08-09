const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  renameFile: (oldName, newName) => ipcRenderer.send('rename-file', oldName, newName),
  onRenameFileResponse: (callback) => ipcRenderer.on('rename-file-response', callback)
});