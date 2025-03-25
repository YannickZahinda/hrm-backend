const { app, BrowserWindow } = require('electron');
const path = require('path');
// const { exec } = require('child_process');
const { stderr, stdout } = require('process');

let mainWindow;

if(process.env.NODE_ENV === "development") {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  if(process.env.NODE_ENV === 'development'){
    mainWindow.loadURL('http://localhost:5173');
    // mainWindow.loadURL('http://localhost:3000');
  }else {
    mainWindow.loadFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
