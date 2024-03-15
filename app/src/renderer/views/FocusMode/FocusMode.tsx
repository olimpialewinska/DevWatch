import { TextGenerateEffect } from "@/renderer/components/ui/text-generate-effect";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import Drawer from "./Drawer";
import { store } from "@/renderer/stores";
import { Link } from "react-router-dom";
import { Button } from "@/renderer/components/ui/button";
import { URLS } from "@/renderer/constants/urls";
import { observer } from "mobx-react-lite";
import { formatTimeSeconds } from "@/renderer/lib/formatTime";

const FocusMode: FC = observer(() => {
  const { t } = useTranslation();
  const timeStore = store.time;
  return (
    <div className="w-full p-6 flex flex-col gap-6 pt-4">
      <div className="flex flex-row justify-between items-center">
        <TextGenerateEffect words={t("focusMode")} className="font-thin" />
        {timeStore.time !== 0 ? (
          <>
            <Button variant="outline" asChild className="min-w-[130px] text-lg">
              <Link to={URLS.COUNTER}>{formatTimeSeconds(timeStore.time)}</Link>
            </Button>
            <Drawer />
          </>
        ) : (
          <Button variant="secondary" onClick={() => timeStore.start(false)}>
            {t("start")}
          </Button>
        )}
      </div>
    </div>
  );
});

export default FocusMode;
