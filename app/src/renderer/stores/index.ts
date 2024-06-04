import { configure } from "mobx";
import { TimeStore } from "./time";
import { ThemeStore } from "./theme";
import { ActiveWindow } from "./activeWindow";
import { UserSettings } from "./userSettings";

configure({ enforceActions: "never" });

export class Store {
  public time = new TimeStore();
  public theme = new ThemeStore();
  public activeWindow = new ActiveWindow();
  public userSettings = new UserSettings();

  constructor() {
    this.init();
  }
  private async init() {}
}

export const store = new Store();
