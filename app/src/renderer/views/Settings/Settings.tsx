import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Tabs } from "@/renderer/components/ui/animated-tabs";
import AccountSettings from "./AccountSettings";
import AppSettings from "./AppSettings";

const Settings: FC = () => {
  const { t } = useTranslation();
  const tabs = [
    {
      title: t("account"),
      value: "account",
      content: <AccountSettings />,
    },
    {
      title: t("app"),
      value: "app",
      content: <AppSettings />,
    },
  ];
  return (
    <div className="w-full p-6 flex flex-col gap-6 pt-4">
      <div className="h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default Settings;
