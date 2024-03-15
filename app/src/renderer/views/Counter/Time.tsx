import React, { FC } from "react";
import { store } from "../../stores";
import { observer } from "mobx-react-lite";
import { formatTimeSeconds } from "@/renderer/lib/formatTime";
import { Button } from "@/renderer/components/ui/button";
import { Pause, Play, TimerOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { URLS } from "@/renderer/constants/urls";
import { Link } from "react-router-dom";

const Time: FC = observer(() => {
  const timeStore = store.time;
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-7 items-center justify-center w-full">
      <p className="text-8xl">{formatTimeSeconds(timeStore.time)}</p>
      <div className="flex flex-row gap-2 items-center ">
        {timeStore.time === 0 ? (
          <Button
            onClick={() => timeStore.start(false)}
            className="gap-2"
            variant="secondary"
          >
            <Play size={20} />
            <span className="text-lg uppercase flex-grow">{t("start")}</span>
          </Button>
        ) : timeStore.isPausedStatus ? (
          <Button
            onClick={() => timeStore.start(false)}
            className="gap-2"
            variant="secondary"
          >
            <Play size={20} />
            <span className="text-lg uppercase">{t("restart")}</span>
          </Button>
        ) : (
          <Button
            onClick={() => timeStore.pause(false)}
            className="gap-2"
            variant="secondary"
          >
            <Pause size={20} />
            <span className="text-lg uppercase">{t("pause")}</span>
          </Button>
        )}
        {timeStore.time !== 0 && (
          <Button
            onClick={() => timeStore.pause(false)}
            className="gap-2"
            variant="secondary"
            asChild
          >
            <Link to={URLS.SUMMARY}>
              <TimerOff size={20} />
              <span className="text-lg uppercase">{t("stop")}</span>
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
});

export default Time;
