import { DayApi } from "@/renderer/api/day";
import { Button } from "@/renderer/components/ui/button";
import { TextGenerateEffect } from "@/renderer/components/ui/text-generate-effect";
import { URLS } from "@/renderer/constants/urls";
import { formatDate } from "@/renderer/lib/formatter";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

const HistoryDetails: FC = () => {
  const { historyId = "", date } = useParams();
  const { t } = useTranslation();
  const { data: day } = useQuery({
    queryKey: ["history", historyId],
    queryFn: () => DayApi.getById(historyId),
  });
  return (
    <div className="w-full p-6 flex flex-col gap-6 pt-2">
      <div className="flex flex-row items-center gap-3">
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
      {day?.date}
    </div>
  );
};

export default HistoryDetails;
