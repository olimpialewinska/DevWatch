import React, { FC, useLayoutEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import LanguageToggle from "./language-toggle";
import logoDark from "@/renderer/assets/logo-dark.png";
import logoLight from "@/renderer/assets/logo-light.png";
import { useTheme } from "./useTheme";

const Navbar: FC = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState<string>(theme);

  useLayoutEffect(() => {
    if (color === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setColor(systemTheme);

      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        const systemTheme = e.matches ? "dark" : "light";
        setColor(systemTheme);
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
    }
  }, []);

  return (
    <div className="w-screen justify-between flex flex-row mt-2 px-2 items-center">
      <img src={color === "dark" ? logoDark : logoLight} className="h-6" />
      <div className="flex flex-row gap-2">
        <ModeToggle />
        <LanguageToggle />
      </div>
    </div>
  );
};

export default Navbar;
