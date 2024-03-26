import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { DayApi } from "@/renderer/api/day";
import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import DashboardElement from "../DashboardElement";
import { roundSecondsToHours } from "@/renderer/lib/formatTime";

const AverageWorkingTimeInMonths: FC = () => {
  const { t } = useTranslation();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["average-working-time-in-months"],
    queryFn: () => DayApi.getAverageWorkingTimeInMonths(),
  });
  return (
    <DashboardElement
      isError={isError}
      isLoading={isPending}
      refetch={refetch}
      title={t("averageWorkingTimeInMonths")}
    >
      <Bar
        data={{
          labels: data?.labels.map((label) => `${t(label)}`) ?? [],
          datasets: [
            {
              label: t("timeSpent"),
              backgroundColor:
                data?.times.map((time) => {
                  const hours = roundSecondsToHours(time);
                  if (hours < 84) {
                    return "rgba(255, 0, 0, 0.2)";
                  } else if (hours <= 90) {
                    return "rgba(255, 255, 0, 0.2)";
                  } else {
                    return "rgba(0, 255, 0, 0.2)";
                  }
                }) ?? [],
              borderColor:
                data?.times.map((time) => {
                  const hours = roundSecondsToHours(time);
                  if (hours < 84) {
                    return "rgb(255, 0, 0)";
                  } else if (hours <= 90) {
                    return "rgb(255, 255, 0)";
                  } else {
                    return "rgb(0, 255, 0)";
                  }
                }) ?? [],
              borderWidth: 1,
              data: data?.times.map((time) => roundSecondsToHours(time)) ?? [],
            },
          ],
        }}
      />
    </DashboardElement>
  );
};

export default AverageWorkingTimeInMonths;
