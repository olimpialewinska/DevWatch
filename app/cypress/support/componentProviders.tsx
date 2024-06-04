import { FC, ReactNode } from "react";
import "@/i18n/i18n";
import queryClient from "./queryClient";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../../src/renderer/components/theme-provider";
import { Toaster } from "../../src/renderer/components/ui/toaster";


const ComponentProviders = ({ children }) => {
  return (
      <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light">
            <Toaster />
            {children}
          </ThemeProvider>
      </QueryClientProvider>
  );
};

export default ComponentProviders;
