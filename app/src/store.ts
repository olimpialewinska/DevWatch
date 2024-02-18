import Store, { Schema } from "electron-store";

interface UserData {
  userData: {
    theme: string;
    autostart: boolean;
    token?: string;
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
      token: {
        type: "string",
      },
    },
  },
};

export const store = new Store<UserData>({ schema });
