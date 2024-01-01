import { ModeToggle } from "@/renderer/components/mode-toggle";
import { ThemeProvider } from "@/renderer/components/theme-provider";
import * as React from "react";
import Login from "./views/Login";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LanguageToggle from "./components/language-toggle";

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <div className="w-screen justify-between flex flex-row">
          <ModeToggle />
          <LanguageToggle />
          <Login />
          <Toaster />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
