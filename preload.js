const { contextBridge, ipcRenderer } = require('electron');

// Expose specific functions or objects to the renderer process
contextBridge.exposeInMainWorld('electronBridge', {
  downloadVideo: (videoUrl, savePath) => {
    ipcRenderer.send('downloadVideo', videoUrl, savePath);
  },
  downloadAudio: (audioUrl, savePath) => {
    ipcRenderer.send('downloadAudio', audioUrl, savePath);
  },
  selectFolder: () => {
    return new Promise((resolve) => {
      ipcRenderer.once('selectedPath', (_, selectedPath) => {
        resolve(selectedPath);
      });
      ipcRenderer.send('selectFolder');
    });
  }
});