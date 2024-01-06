import { Button } from "@/renderer/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/renderer/components/ui/select";
import { Separator } from "@/renderer/components/ui/separator";
import { Switch } from "@/renderer/components/ui/switch";
import { URLS } from "@/renderer/constants/urls";
import { Home } from "lucide-react";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AppSettings: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full overflow-hidden relative h-full font-thin rounded-xl p-8 dark:bg-black dark:border-white/[0.2] bg-white border border-input">
      <h1 className="uppercase font-thin tracking-wider text-2xl mb-7">
        {t("appSettings")}
      </h1>
      <div className="flex flex-col gap-6 px-4 h-[calc(100%-60px)]">
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg">{t("language")}</p>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg">{t("theme")}</p>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-2" />

        <div className="flex flex-row justify-between items-center">
          <p className="text-lg">{t("notifications")}</p>
          <Switch id="airplane-mode" />
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg">{t("autostart")}</p>
          <Switch id="airplane-mode" />
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg">{t("logoutOnClose")}</p>
          <Switch id="airplane-mode" />
        </div>
        <div className="flex-1" />
        <div className="flex flex-row justify-end items-center">
          <Button className="gap-2" variant="secondary" asChild>
            <Link to={URLS.DASHBOARD}>
              <Home size={18} />
              <span>{t("backToDashboard")}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;
