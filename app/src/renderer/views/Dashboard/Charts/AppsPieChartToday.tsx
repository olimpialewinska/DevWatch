import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { DayApi } from "@/renderer/api/day";
import { useQuery } from "@tanstack/react-query";
import { Pie } from "react-chartjs-2";
import { formatDate } from "@/renderer/lib/formatter";
import { roundMsToMinutes } from "@/renderer/lib/formatTime";
import DashboardElement from "../DashboardElement";

const AppsPieChartToday: FC = () => {
  const { t } = useTranslation();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["apps-pie-chart-today"],
    queryFn: () => DayApi.getAppsPieChartToday(),
  });

  const randomColorGenerator = () => {
    return "#" + (Math.random().toString(16) + "0000000").slice(2, 8);
  };

  const backgroundColors = data?.labels.map(() => randomColorGenerator()) ?? [];

  return (
    <DashboardElement
      isError={isError}
      isLoading={isPending}
      refetch={refetch}
      title={t("appsUsageAt", {
        date: data?.date && formatDate(new Date(data?.date!)),
      })}
    >
      <Pie
        className="max-w-[160px] max-h-[160px]"
        data={{
          labels: data?.labels.map((label) => `${t(label)}`) ?? [],
          datasets: [
            {
              label: t("timeSpent"),
              borderWidth: 1,
              data: data?.times.map((time) => roundMsToMinutes(time)) ?? [],
              backgroundColor: backgroundColors,
            },
          ],
        }}
      />
    </DashboardElement>
  );
};

export default AppsPieChartToday;
