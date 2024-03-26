import { TextGenerateEffect } from "@/renderer/components/ui/text-generate-effect";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DayApi } from "@/renderer/api/day/DayApi";
import { HISTORY_FETCH_LIMIT } from "@/renderer/constants/fetchLimits";
import HistoryRow from "./HistoryRow";
import { ScrollArea } from "@/renderer/components/ui/scroll-area";
import { Skeleton } from "@/renderer/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import SectionFetchError from "@/renderer/components/SectionFetchError";

const History: FC = () => {
  const { t } = useTranslation();
  const { ref, entry } = useInView({ trackVisibility: true, delay: 100 });

  const {
    data: history,
    isError,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["history"],
    queryFn: ({ pageParam = 0 }) =>
      DayApi.getHistory(HISTORY_FETCH_LIMIT, pageParam),
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length * HISTORY_FETCH_LIMIT;
      return nextPage < lastPage.count ? nextPage : undefined;
    },
    initialPageParam: 0,
  });

  const SkeletonComponent = () => {
    return (
      <>
        {Array.from({ length: HISTORY_FETCH_LIMIT }).map((_, i) => (
          <Skeleton className="h-[58px] w-full" key={i} />
        ))}
      </>
    );
  };

  useEffect(() => {
    if (entry?.isIntersecting && !isLoading) {
      void fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, isLoading]);

  return (
    <div className="w-full p-6 flex flex-col gap-6 pt-2">
      <div className="flex flex-row justify-between items-center">
        <TextGenerateEffect words={t("history")} className="font-thin" />
      </div>
      <ScrollArea
        className="h-[calc(100vh-140px)] pr-3 flex justify-center items-center"
        viewportClassName="max-w-6xl"
      >
        <div className="flex flex-col gap-2">
          {isError ? (
            <SectionFetchError />
          ) : isLoading ? (
            <SkeletonComponent />
          ) : history?.pages[0].count ? (
            history?.pages.map((page) =>
              page.results.map((day) => <HistoryRow key={day.id} day={day} />)
            )
          ) : (
            <div className="w-full flex flex-row justify-between px-4 py-2 rounded-lg gap-2 border items-center">
              <p>{t("noData")}</p>
            </div>
          )}
        </div>
        {isFetchingNextPage && <SkeletonComponent />}
        {hasNextPage && <div ref={ref} />}
      </ScrollArea>
    </div>
  );
};

export default History;
