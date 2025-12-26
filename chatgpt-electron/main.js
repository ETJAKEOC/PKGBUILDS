#!/usr/bin/env node
const { app, BrowserWindow } = require('electron');

// Performance / GPU tweaks
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('enable-accelerated-video');
app.commandLine.appendSwitch('enable-webgl');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-oop-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('enable-features', 'VaapiVideoDecoder');

app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');
app.commandLine.appendSwitch('disable-background-networking');

app.commandLine.appendSwitch('no-default-browser-check');
app.commandLine.appendSwitch('disable-component-update');
app.commandLine.appendSwitch('disable-print-preview');
app.commandLine.appendSwitch('disable-features', 'CalculateNativeWinOcclusion');

// DPI / scaling
app.commandLine.appendSwitch('force-device-scale-factor', '1');

// ===================
// Create Window
// ===================
function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#000000',
    show: false,
    useContentSize: true,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      partition: 'persist:chatgpt-electron',
    },
  });

  // Load ChatGPT
  win.loadURL('https://chat.openai.com/');

  // Show only when fully ready
  win.once('ready-to-show', () => {
    win.show();
  });

  // Hide menu bar
  win.setMenuBarVisibility(false);

  // Clean shutdown
  win.on('closed', () => {
    win.destroy();
  });

  // -------------------
  // Context menu (safe)
  // -------------------
  try {
    const contextMenu = require('electron-context-menu');
    if (typeof contextMenu === 'function') {
      contextMenu({
        window: win,
        showInspectElement: false,
      });
    }
  } catch (e) {
    console.warn('electron-context-menu failed:', e.message);
  }
}

// ===================
// App lifecycle
// ===================
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
