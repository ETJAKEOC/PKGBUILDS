#!/usr/bin/env node
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Performance / GPU tweaks
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('enable-accelerated-video');
app.commandLine.appendSwitch('enable-webgl');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('high-dpi-support', '1');
app.commandLine.appendSwitch('force-device-scale-factor', '1');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#000000',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      partition: 'persist:everycircuit', // persistent cookies/localStorage
    },
  });

  win.loadURL('https://everycircuit.com/app');

  // Show only when ready
  win.once('ready-to-show', () => win.show());

  // Smooth rendering
  win.webContents.setBackgroundThrottling(false);
  win.webContents.setFrameRate(60);

  // Force close
  win.on('close', () => win.destroy());

  win.setMenuBarVisibility(false);
  // win.setAlwaysOnTop(true); // optional
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
