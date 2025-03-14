const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;

app.on('ready', () => {
    exec('npm run start', { cwd: path.join(__dirname) });

    mainWindow = new BrowserWindow({
        width: 1200,
        heigh: 800,
        webPreference: {
            nodeIntegration: true,
        }
    })

    mainWindow.loadURL('http://localhost:3000');
})