import { DayApi } from "@/renderer/api/day";
import Tooltip from "@/renderer/components/Tooltip";
import { Button } from "@/renderer/components/ui/button";
import { useToast } from "@/renderer/components/ui/use-toast";
import { URLS } from "@/renderer/constants/urls";
import { formatTimeMs } from "@/renderer/lib/formatTime";
import { formatDate } from "@/renderer/lib/formatter";
import { Day } from "@/renderer/types/Day";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Info, Trash } from "lucide-react";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface HistoryRowProps {
  day: Day;
}

const HistoryRow: FC<HistoryRowProps> = ({ day }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: deleteDay } = useMutation({
    mutationFn: () => DayApi.delete(day.id),
    onSuccess: () => {
      toast({
        title: t("dayDeleted"),
        description: t("dayDeletedDescription"),
      });
    },
    onError: () => {
      toast({
        title: t("dayDeletedError"),
        description: t("dayDeletedErrorDescription"),
      });
    },
  });

  const handleDelete = () => {
    deleteDay();
    queryClient.invalidateQueries({ queryKey: ["history"] });
  };

  return (
    <div className="w-full flex flex-row justify-between px-4 py-2 rounded-lg gap-2 border items-center">
      <p>{formatDate(new Date(day.date))}</p>
      <div className="flex flex-row items-center gap-2">
        <p>{formatTimeMs(day.time * 1000)}</p>
        <Tooltip text={t("delete")}>
          <Button
            variant="ghost"
            size="icon"
            className="ml-10"
            onClick={handleDelete}
          >
            <Trash className="text-destructive" />
          </Button>
        </Tooltip>
        <Tooltip text={t("seeDetails")}>
          <Button variant="ghost" size="icon" asChild>
            <Link to={`${URLS.HISTORY_DETAILS}/${day.id}/${day.date}`}>
              <Info />
            </Link>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default HistoryRow;
