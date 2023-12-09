import { atom } from "recoil";

export const Theme = atom<"dark" | "light" | "system">({
  key: "app-theme",
  default: "system",
});
