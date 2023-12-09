import { ModeToggle } from "@/renderer/components/mode-toggle";
import { ThemeProvider } from "@/renderer/components/theme-provider";
import * as React from "react";

export const App = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="w-screen justify-between flex flex-row">
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
};
