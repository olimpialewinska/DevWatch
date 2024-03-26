import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { DayApi } from "@/renderer/api/day";
import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import { Skeleton } from "@/renderer/components/ui/skeleton";
import SectionFetchError from "@/renderer/components/SectionFetchError";
import DashboardElement from "../DashboardElement";

const NumberOfApps7Days: FC = () => {
  const { t } = useTranslation();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["number-of-apps-7-days"],
    queryFn: () => DayApi.numberOfAppsOpened7Days(),
  });
  return (
    <DashboardElement
      isError={isError}
      isLoading={isPending}
      refetch={refetch}
      title={t("numberOfApps")}
    >
      <Bar
        data={{
          labels: data?.labels.map((label) => `${t(label)}`) ?? [],
          datasets: [
            {
              label: t("appsOpened"),
              backgroundColor: "rgba(0, 4, 255, 0.2)",
              borderColor: "rgb(0, 94, 255)",
              borderWidth: 1,
              data: data?.times.map((time) => time) ?? [],
            },
          ],
        }}
      />
    </DashboardElement>
  );
};

export default NumberOfApps7Days;
