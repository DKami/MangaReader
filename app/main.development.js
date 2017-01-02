import { app, BrowserWindow, Menu, shell } from 'electron';

let menu;
let template;
let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    show: false,
    width: 728,
    height: 1024
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

});
