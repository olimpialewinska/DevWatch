import { ThemeProvider } from "@/renderer/components/theme-provider";
import * as React from "react";
import Login from "./views/Login";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "./components/ui/scroll-area";

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <ScrollArea className="h-screen w-full">
          <Navbar />
          <Outlet />
          <Toaster />
        </ScrollArea>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
