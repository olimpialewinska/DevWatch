import React, { FC, useLayoutEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import LanguageToggle from "./language-toggle";
import logoDark from "@/renderer/assets/logo-dark.png";
import logoLight from "@/renderer/assets/logo-light.png";
import { useTheme } from "./useTheme";
import { URLS } from "../constants/urls";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { UserRoundCog } from "lucide-react";
import Tooltip from "./Tooltip";

const Navbar: FC = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState<string>(theme);
  const { t } = useTranslation();

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
    <div className="w-screen justify-between flex flex-row mt-2 px-6 items-center">
      <Link to={URLS.DASHBOARD}>
        <img src={color === "dark" ? logoDark : logoLight} className="h-6" />
      </Link>
      <div className="flex flex-row gap-2">
        <Button className="ml-6" variant="link" asChild>
          <Link to={URLS.HISTORY}>{t("history")}</Link>
        </Button>
        <Button variant="link" className="mr-3" asChild>
          <Link to={URLS.FOCUS_MODE}>{t("focusMode")}</Link>
        </Button>
        <Tooltip text={t("settings")}>
          <Button
            variant="outline"
            size="icon"
            className="min-w-[40px]"
            asChild
          >
            <Link to={URLS.USER_SETTINGS}>
              <UserRoundCog size={20} />
            </Link>
          </Button>
        </Tooltip>
        <LogoutButton />
        <ModeToggle />
        <LanguageToggle />
      </div>
    </div>
  );
};

export default Navbar;
