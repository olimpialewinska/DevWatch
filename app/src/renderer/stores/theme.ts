import { makeAutoObservable } from "mobx";

type ThemeType = "dark" | "light" | "system";
export class ThemeStore {
  public theme: ThemeType = "system";

  constructor() {
    makeAutoObservable(this);
  }

  public setTheme(theme: ThemeType) {
    this.theme = theme;
  }
}
