import { makeAutoObservable } from "mobx";
import { ActiveWindow } from "./activeWindow";
import { DayApi } from "../api/day";

export class TimeStore {
  public time: number = 0;
  private intervalId?: NodeJS.Timeout;
  private isPaused: boolean = false;
  public activeWindowStore: ActiveWindow;
  private dayId: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.activeWindowStore = new ActiveWindow();
  }

  public start(notification: boolean = true) {
    if (!this.dayId) {
      this.dayStart();
    }
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
        if (this.time % 30 === 0) {
          this.updateTime(30);
        }
        this.time += 1;
      }, 1000);
      this.activeWindowStore.start();
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
    this.activeWindowStore.pause();
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
    this.activeWindowStore.pause();
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
    this.activeWindowStore.resume();
  }

  public get isPausedStatus() {
    return this.isPaused;
  }

  private dayStart = async () => {
    const day = await DayApi.dayStart();
    this.dayId = day.id;
  };

  private updateTime = async (time?: 30) => {
    if (this.dayId) {
      await DayApi.updateTimer(this.dayId, time || this.time);
    }
  };
}
