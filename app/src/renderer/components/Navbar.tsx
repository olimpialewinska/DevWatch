import React, { FC, useContext, useLayoutEffect, useState } from "react";
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
import { store } from "../stores";
import { observer } from "mobx-react-lite";
import { formatTimeSeconds } from "../lib/formatTime";
import { cn } from "../lib/utils";
import { AuthContext } from "./AuthProvider";

const Navbar: FC = observer(() => {
  const { theme } = useTheme();
  const [color, setColor] = useState<string>(theme);
  const { t } = useTranslation();
  const timeStore = store.time;
  const { authState } = useContext(AuthContext);

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
      <Link
        to={URLS.DASHBOARD}
        className={authState.authenticated ? "flex" : "pointer-events-none"}
      >
        <img src={color === "dark" ? logoDark : logoLight} className="h-6" />
      </Link>
      <div className="flex flex-row gap-2">
        {authState.authenticated && (
          <>
            <Button className="ml-6" variant="link" asChild>
              <Link to={URLS.HISTORY}>{t("history")}</Link>
            </Button>
            <Button variant="link" className="mr-3" asChild>
              <Link to={URLS.FOCUS_MODE}>{t("focusMode")}</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className={cn(
                timeStore.time === 0 && "hidden",
                "min-w-[130px] text-lg"
              )}
            >
              <Link to={URLS.COUNTER}>{formatTimeSeconds(timeStore.time)}</Link>
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
          </>
        )}
        <ModeToggle />
        <LanguageToggle />
      </div>
    </div>
  );
});

export default Navbar;
