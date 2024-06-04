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
import { useTheme } from "@/renderer/components/useTheme";
import { URLS } from "@/renderer/constants/urls";
import i18n, { Language, languages } from "@/renderer/i18n/i18n";
import { store } from "@/renderer/stores";
import { Home } from "lucide-react";
import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AppSettings: FC = observer(() => {
  const { t } = useTranslation();
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = useState(i18n.language);
  const userSettings = store.userSettings;

  const toggleLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    setLanguage(language);
  };

  return (
    <div className="w-full overflow-hidden relative h-full font-thin rounded-xl p-8 dark:bg-black dark:border-white/[0.2] bg-white border border-input">
      <h1 className="uppercase font-thin tracking-wider text-2xl mb-7">
        {t("appSettings")}
      </h1>
      <div className="flex flex-col gap-6 px-4 h-[calc(100%-60px)]">
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg">{t("language")}</p>
          <Select
            defaultValue={language}
            onValueChange={(lang) => toggleLanguage(lang as Language)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t(language)} />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {t(lang)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg">{t("theme")}</p>
          <Select defaultValue={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={theme} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">{t("light")}</SelectItem>
              <SelectItem value="dark">{t("dark")}</SelectItem>
              <SelectItem value="system">{t("system")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg">{t("notifications")}</p>
          <Switch
            id="notifications"
            checked={void userSettings.getNotifications()}
            onCheckedChange={(value) => userSettings.setNotifications(value)}
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg">{t("autostart")}</p>
          <Switch
            id="autostart"
            checked={void userSettings.getAutoStart()}
            onCheckedChange={(value) => userSettings.setAutoStart(value)}
          />
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg">{t("logoutOnClose")}</p>
          <Switch
            id="logoutOnClose"
            checked={void userSettings.getLogOutOnClose()}
            onCheckedChange={(value) => userSettings.setLogOutOnClose(value)}
          />
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
});

export default AppSettings;
