import { ThemeProvider } from "@/renderer/components/theme-provider";
import * as React from "react";
import Login from "./views/Login";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
