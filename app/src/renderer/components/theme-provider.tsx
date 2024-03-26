import { Theme } from "@/renderer/types/Theme";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import React from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext = createContext<
  ThemeProviderState | undefined
>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => defaultTheme);

  useLayoutEffect(() => {
    (async () => {
      const themeColor = await window.electron.ipcRenderer.invoke("get-theme");
      setTheme(themeColor);
    })();

    // return () => {
    //   window.electron.ipcRenderer.removeAllListeners("get-theme");
    // };
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);

      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        const systemTheme = e.matches ? "dark" : "light";
        root.classList.remove("light", "dark");
        root.classList.add(systemTheme);
      };

      const systemThemeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      systemThemeMediaQuery.addEventListener("change", handleSystemThemeChange);

      return () => {
        systemThemeMediaQuery.removeEventListener(
          "change",
          handleSystemThemeChange
        );
      };
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      window.electron.ipcRenderer.send("toggle-mode", theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
