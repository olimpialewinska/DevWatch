import { Button } from "@/renderer/components/ui/button";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { HomeGrid } from "./HomeGrid";
import { TextGenerateEffect } from "@/renderer/components/ui/text-generate-effect";
import { useTranslation } from "react-i18next";
import { URLS } from "@/renderer/constants/urls";
import { store } from "@/renderer/stores";
import { observer } from "mobx-react-lite";

const Dashboard: FC = observer(() => {
  const { t } = useTranslation();
  const timeStore = store.time;
  return (
    <div className="w-full p-6 flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <TextGenerateEffect words={"Hello, Olimpia!"} className="font-thin" />
        <div className="flex gap-4">
          {timeStore.time !== 0 && (
            <Button
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              asChild
              onClick={() => timeStore.pause(false)}
            >
              <Link to={URLS.SUMMARY}>{t("stop")}</Link>
            </Button>
          )}
          <Button asChild>
            <Link to={URLS.COUNTER}>{t("start")}</Link>
          </Button>
        </div>
      </div>
      <HomeGrid />
    </div>
  );
});

export default Dashboard;
