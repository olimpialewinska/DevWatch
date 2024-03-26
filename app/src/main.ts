import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  nativeTheme,
  Notification,
} from "electron";
import { store } from "./store";
import { Theme } from "./renderer/types/Theme";
import { windowManager } from "node-window-manager";

let mainWindow: BrowserWindow;

let theme: Theme = store.get("userData.theme");
if (!theme) {
  theme = nativeTheme.shouldUseDarkColors ? "dark" : "light";
  store.set("userData.theme", "system");
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    title: "DevWatch",
    icon: "./public/icon.png",
    webPreferences: {
      preload: __dirname + "/preload.js",
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
      backgroundThrottling: false,
    },
  });

  if (process.env.DEV === "1") {
    mainWindow.loadURL("http://localhost:4444/");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile("build/index.html");
  }

  mainWindow.webContents.openDevTools({ mode: "left" });

  globalShortcut.register("CommandOrControl+N", toggleWindow);

  globalShortcut.register("CommandOrControl+K", () => {
    app.quit();
  });

  globalShortcut.register("CommandOrControl+Alt+S", () => {
    mainWindow.webContents.send("restart-or-pause");
  });
}

function toggleWindow() {
  if (!mainWindow.isVisible()) {
    mainWindow.show();
    mainWindow.focus();
  } else {
    mainWindow.hide();
  }
}

function showNotification(
  NOTIFICATION_TITLE: string,
  NOTIFICATION_BODY: string
) {
  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
  }).show();
}

ipcMain.on("toggle-mode", (_, theme: Theme) => {
  store.set("userData.theme", theme);
  nativeTheme.themeSource = theme;
  return theme;
});

ipcMain.handle("get-theme", () => {
  return theme;
});

ipcMain.handle("get-initial-data", () => {
  return store.get("userData.initialData");
});

ipcMain.handle("set-initial-data", (_, initialData) => {
  store.set("userData.initialData", initialData);
});

ipcMain.handle("get-token", () => {
  return store.get("userData.token");
});

ipcMain.handle("set-token", (_, token: string) => {
  store.set("userData.token", token);
});

ipcMain.handle("clear-store", () => {
  store.clear();
});

ipcMain.handle("remove-token", () => {
  store.delete("userData.token");
});

ipcMain.handle("get-active-window", (event) => {
  const activeWindow = windowManager.getActiveWindow().getTitle();
  return activeWindow;
});

app.on("ready", createWindow);

ipcMain.on("show-notification", (_, NOTIFICATION_TITLE, NOTIFICATION_BODY) => {
  showNotification(NOTIFICATION_TITLE, NOTIFICATION_BODY);
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
