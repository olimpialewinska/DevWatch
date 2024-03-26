import { Button } from "@/renderer/components/ui/button";
import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { TextGenerateEffect } from "@/renderer/components/ui/text-generate-effect";
import { useTranslation } from "react-i18next";
import { URLS } from "@/renderer/constants/urls";
import { store } from "@/renderer/stores";
import { observer } from "mobx-react-lite";
import { AuthContext } from "@/renderer/components/AuthProvider";
import BarChartLastWeek from "./Charts/BarChartLastWeek";
import AppsPieChartToday from "./Charts/AppsPieChartToday";
import AverageWorkingTimeInMonths from "./Charts/AverageWorkingTimeInMonths";
import NumberOfApps7Days from "./Charts/NumberOfApps";
import TotalWorkingTimeInMonths from "./Charts/TotalWorkingTimeInMonths";
import DistributionOfUsedApplications from "./Charts/DistributionOfUsedApplications";

const Dashboard: FC = observer(() => {
  const { t } = useTranslation();
  const timeStore = store.time;
  const { authState } = useContext(AuthContext);
  return (
    <div className="w-full p-6 flex flex-col gap-6 justify-center items-center">
      <div className="flex flex-row justify-between items-center w-full">
        <TextGenerateEffect
          words={t("hello", { email: authState?.email })}
          className="font-thin"
        />
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
        <BarChartLastWeek />
        <AppsPieChartToday />
        <AverageWorkingTimeInMonths />
        <NumberOfApps7Days />
        <TotalWorkingTimeInMonths />
        <DistributionOfUsedApplications />
      </div>
    </div>
  );
});

export default Dashboard;
