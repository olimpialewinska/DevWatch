import React, { FC } from "react";
import Header from "./Header";
import { store } from "@/renderer/stores";
import { Button } from "@/renderer/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { URLS } from "@/renderer/constants/urls";
import { ArrowLeft, MonitorX } from "lucide-react";
import { observer } from "mobx-react-lite";

const Summary: FC = observer(() => {
  const timeStore = store.time;
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <Header />
      <div className="flex flex-row justify-center items-center w-full px-12">
        <Button
          onClick={() => timeStore.start(false)}
          className="gap-2"
          variant="secondary"
          asChild
        >
          <Link to={URLS.COUNTER}>
            <ArrowLeft size={20} />
            <span>{t("back")}</span>
          </Link>
        </Button>
        <div className="flex-grow" />
        <Button
          onClick={() => timeStore.stop()}
          className="gap-2"
          variant="secondary"
          asChild
        >
          <Link to={URLS.DASHBOARD}>
            <MonitorX size={20} />
            <span>{t("finishWork")}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
});

export default Summary;
