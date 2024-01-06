import { configure } from "mobx";
import { TimeStore } from "./time";
import { ThemeStore } from "./theme";

configure({ enforceActions: "never" });

export class Store {
  public time = new TimeStore();
  public theme = new ThemeStore();

  constructor() {
    this.init();
  }
  private async init() {}
}

export const store = new Store();
