import { ThemeProvider } from "@/renderer/components/theme-provider";
import * as React from "react";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "./components/ui/scroll-area";
import { FC } from "react";
import { store } from "./stores";
import { observer } from "mobx-react-lite";

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
        <Outlet />
      </QueryClientProvider>
    </ThemeProvider>
  );
});
