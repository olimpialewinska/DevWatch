import { makeAutoObservable } from "mobx";

export class UserSettings {
  public logOutOnClose: boolean = false;
  public notifications: boolean = true;
  public autoStart: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  public async setLogOutOnClose(logOutOnClose: boolean) {
    await window.electron.ipcRenderer.invoke(
      "set-log-out-on-close",
      logOutOnClose
    );
    this.logOutOnClose = logOutOnClose;
  }

  public async getLogOutOnClose() {
    return this.logOutOnClose;
  }

  public async setNotifications(notifications: boolean) {
    await window.electron.ipcRenderer.invoke(
      "set-notifications",
      notifications
    );
    this.notifications = notifications;
  }

  public async getNotifications() {
    return this.notifications;
  }

  public async setAutoStart(autoStart: boolean) {
    await window.electron.ipcRenderer.invoke("set-auto-start", autoStart);
    this.autoStart = autoStart;
  }

  public async getAutoStart() {
    return this.autoStart;
  }
}
