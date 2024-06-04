import Store, { Schema } from "electron-store";

export interface InitialData {
  date: string;
  time: number;
  windows: string;
}

interface UserData {
  userData: {
    theme: string;
    autostart: boolean;
    notification: boolean;
    logOutOnClose: boolean;
    token?: string;
    initialData: {
      date: string;
      time: number;
      windows: string;
    };
  };
}

const schema: Schema<UserData> = {
  userData: {
    type: "object",
    properties: {
      theme: {
        type: "string",
        default: "light",
        enum: ["light", "dark", "system"],
      },
      autostart: {
        type: "boolean",
        default: true,
      },
      logOutOnClose: {
        type: "boolean",
        default: false,
      },
      notification: {
        type: "boolean",
        default: true,
      },
      token: {
        type: "string",
      },
      initialData: {
        default: undefined,
      },
    },
  },
};

export const store = new Store<UserData>({ schema });
