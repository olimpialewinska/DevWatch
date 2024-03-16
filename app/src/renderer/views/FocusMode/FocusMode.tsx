import { TextGenerateEffect } from "@/renderer/components/ui/text-generate-effect";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import Drawer from "./Drawer";
import { store } from "@/renderer/stores";
import { Button } from "@/renderer/components/ui/button";
import { observer } from "mobx-react-lite";

const FocusMode: FC = observer(() => {
  const { t } = useTranslation();
  const timeStore = store.time;
  return (
    <div className="w-full p-6 flex flex-col gap-6 pt-4">
      <div className="flex flex-row justify-between items-center">
        <TextGenerateEffect words={t("focusMode")} className="font-thin" />
        {timeStore.time !== 0 ? (
          <Drawer />
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
