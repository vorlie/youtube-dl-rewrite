const { app, BrowserWindow } = require('electron');
const path = require('path');

const iconPath = path.join(__dirname, 'public/icon.png');
function createWindow() {
  const mainWindow = new BrowserWindow({
    icon: iconPath,
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  });


  mainWindow.loadFile('index.html');
  mainWindow.setMinimumSize(700, 400);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});