import { makeAutoObservable } from "mobx";

let instance: ActiveWindow | null = null;

export class ActiveWindow {
  public activeWindow: string = "";
  public windowTime: { [key: string]: number } = {};
  private intervalId?: NodeJS.Timeout;

  constructor() {
    makeAutoObservable(this);
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  public start() {
    let lastCheck = Date.now();

    this.intervalId = setInterval(async () => {
      const active = await window.electron.ipcRenderer.invoke(
        "get-active-window"
      );
      if (active === "") return;

      const timeSpent = Date.now() - lastCheck;
      if (active in this.windowTime) {
        this.windowTime[active] += timeSpent;
      } else {
        this.windowTime[active] = timeSpent;
      }

      if (active !== this.activeWindow) {
        this.activeWindow = active;
      }

      lastCheck = Date.now();
    }, 1000);
  }

  public resume = () => this.start();

  public pause() {
    this.activeWindow = "";
    clearInterval(this.intervalId);
  }
  public clearAll() {
    this.activeWindow = "";
    clearInterval(this.intervalId);
    this.windowTime = {};
  }
}
