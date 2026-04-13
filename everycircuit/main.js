#!/usr/bin/env node
const { app, BrowserWindow } = require('electron');

// Performance / GPU tweaks
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('enable-accelerated-video');
app.commandLine.appendSwitch('enable-webgl');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('enable-native-gpu-memory-buffers');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-oop-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
// app.commandLine.appendSwitch('use-gl', 'egl');
app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder,VaapiVideoEncoder');
app.commandLine.appendSwitch('enable-accelerated-mjpeg-decode');

app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');
app.commandLine.appendSwitch('disable-background-networking');

app.commandLine.appendSwitch('no-default-browser-check');
app.commandLine.appendSwitch('disable-component-update');
app.commandLine.appendSwitch('disable-print-preview');
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion');

app.commandLine.appendSwitch('process-per-site');
app.commandLine.appendSwitch('renderer-process-limit', '2');

// DPI / scaling
app.commandLine.appendSwitch('force-device-scale-factor', '1');

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#000000',
    show: false,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: false,
      contextIsolation: true,
      partition: 'persist:everycircuit', // persistent cookies/localStorage
    },
  });

  // Everycircuit simulator website
  win.loadURL('https://everycircuit.com/app');

  // Show only when ready
  win.once('ready-to-show', () => win.show());

  // Smooth rendering
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
