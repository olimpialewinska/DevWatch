import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  nativeTheme,
} from "electron";
import { store } from "./store";
import { Theme } from "./renderer/types/Theme";

let mainWindow: BrowserWindow;

let theme: Theme = store.get("userData.theme");
if (!theme) {
  theme = nativeTheme.shouldUseDarkColors ? "dark" : "light";
  store.set("userData.theme", "system");
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "DevWatch",
    icon: "./public/icon.png",
    webPreferences: {
      preload: __dirname + "/preload.js",
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
    },
  });
  mainWindow.setMenuBarVisibility(false);

  if (process.env.DEV === "1") {
    mainWindow.loadURL("http://localhost:4444/");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile("build/index.html");
  }

  globalShortcut.register("CommandOrControl+N", toggleWindow);

  globalShortcut.register("CommandOrControl+K", () => {
    app.quit();
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

ipcMain.on("toggle-mode", (event, theme: Theme) => {
  store.set("userData.theme", theme);
  nativeTheme.themeSource = theme;
  return theme;
});

ipcMain.handle("get-theme", (event) => {
  return theme;
});

app.on("ready", createWindow);

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
