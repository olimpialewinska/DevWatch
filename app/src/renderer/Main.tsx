import { ThemeProvider } from "@/renderer/components/theme-provider";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { FC } from "react";
import { store } from "./stores";
import { observer } from "mobx-react-lite";
import { AuthProvider } from "./components/AuthProvider";
import AxiosProvider from "./components/AxiosProvider";

window.electron.ipcRenderer.on("restart-or-pause", (e) => {
  const timeStore = store.time;
  timeStore.time === 0
    ? timeStore.start()
    : timeStore.isPausedStatus
    ? timeStore.start()
    : timeStore.pause();
});

export const Main: FC = observer(() => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AxiosProvider>
            <Outlet />
          </AxiosProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
});
