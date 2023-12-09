export interface Electron {
  ipcRenderer: Electron.IpcRenderer;
}

declare global {
  interface Window {
    electron: Electron;
  }
}
