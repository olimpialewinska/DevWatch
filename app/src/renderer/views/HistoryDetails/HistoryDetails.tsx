import { DayApi } from "@/renderer/api/day";
import SectionFetchError from "@/renderer/components/SectionFetchError";
import { Button } from "@/renderer/components/ui/button";
import { Skeleton } from "@/renderer/components/ui/skeleton";
import { TextGenerateEffect } from "@/renderer/components/ui/text-generate-effect";
import { URLS } from "@/renderer/constants/urls";
import { formatTimeMs, formatTimeSeconds } from "@/renderer/lib/formatTime";
import { formatDate } from "@/renderer/lib/formatter";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

const HistoryDetails: FC = () => {
  const { historyId = "", date } = useParams();
  const { t } = useTranslation();
  const {
    data: day,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["history", historyId],
    queryFn: () => DayApi.getById(historyId),
  });

  return (
    <div className="w-full p-6 flex flex-col gap-6 pt-2 items-center">
      <div className="flex flex-row items-center gap-3 w-full">
        <Button variant="ghost" size="icon" asChild>
          <Link to={URLS.HISTORY}>
            <ChevronLeft />
          </Link>
        </Button>
        <TextGenerateEffect
          words={`${t("day")} ${formatDate(new Date(date ?? ""))}`}
          className="font-thin"
        />
      </div>
      {isError ? (
        <SectionFetchError />
      ) : isPending ? (
        <Skeleton className="h-12 w-64 my-10" />
      ) : (
        <h1 className="text-center text-5xl font-bold my-10">
          {formatTimeMs(day.time * 1000)}
        </h1>
      )}
      <div className="flex flex-col items-center gap-3 w-full max-w-xl text-lg">
        {isPending
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-12" />
            ))
          : !isError &&
            day.details.map((detail) => {
              return (
                <div
                  key={detail.id}
                  className="w-full flex flex-row justify-between px-4 py-2 rounded-md shadow-xl gap-2 border"
                >
                  <span>{detail.app_name}</span>
                  <span>{formatTimeMs(detail.app_open_time)}</span>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default HistoryDetails;
