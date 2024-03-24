import { makeAutoObservable } from "mobx";
import { ActiveWindow } from "./activeWindow";
import { DayApi } from "../api/day";
import { InitialData } from "@/store";

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
      (async () => {
        const initialData = (await window.electron.ipcRenderer.invoke(
          "get-initial-data"
        )) as InitialData;
        if (
          initialData &&
          initialData.date === new Date().toISOString().split("T")[0]
        ) {
          this.time = initialData.time;
          this.activeWindowStore.windowTime = JSON.parse(initialData.windows);
        }
      })();
      if (notification)
        window.electron.ipcRenderer.send(
          "show-notification",
          "Timer started",
          "Timer started successfully"
        );
      this.stop();
      this.intervalId = setInterval(() => {
        if (this.time % 30 === 0) {
          this.updateTime();
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

  public finnishWorkDay = async () => {
    const data = {
      date: new Date().toISOString().split("T")[0],
      time: this.time,
      windows: JSON.stringify(this.activeWindowStore.windowTime),
    };
    await window.electron.ipcRenderer.invoke("set-initial-data", data);
  };

  private dayStart = async () => {
    const day = await DayApi.dayStart();
    this.dayId = day.id;
  };

  private updateTime = async () => {
    if (this.dayId) {
      await DayApi.updateTimer(
        this.dayId,
        this.time,
        this.activeWindowStore.windowTime
      );
    }
  };
}
