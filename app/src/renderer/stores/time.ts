import { makeAutoObservable } from "mobx";

export class TimeStore {
  public time: number = 0;
  private intervalId?: NodeJS.Timeout;
  private isPaused: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public start(notification: boolean = true) {
    if (this.isPaused) {
      this.resume(notification);
    } else {
      if (notification)
        window.electron.ipcRenderer.send(
          "show-notification",
          "Timer started",
          "Timer started successfully"
        );
      this.stop();
      this.intervalId = setInterval(() => {
        this.time += 1;
      }, 1000);
    }
  }

  public stop(notification: boolean = true) {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
      if (notification)
        window.electron.ipcRenderer.send(
          "show-notification",
          "Timer stopped",
          "Timer stopped successfully"
        );
    }
    this.time = 0;
    this.isPaused = false;
  }

  public pause(notification: boolean = true) {
    if (notification)
      window.electron.ipcRenderer.send(
        "show-notification",
        "Timer paused",
        "Timer paused successfully"
      );
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
    this.isPaused = true;
  }

  public resume(notification: boolean = true) {
    if (notification)
      window.electron.ipcRenderer.send(
        "show-notification",
        "Timer resumed",
        "Timer resumed successfully"
      );
    this.isPaused = false;
    this.intervalId = setInterval(() => {
      this.time += 1;
    }, 1000);
  }

  public get isPausedStatus() {
    return this.isPaused;
  }
}
