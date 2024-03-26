import SectionFetchError from "@/renderer/components/SectionFetchError";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/renderer/components/ui/dialog";
import { Skeleton } from "@/renderer/components/ui/skeleton";
import React, { FC, ReactNode } from "react";

interface DashboardElementProps {
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  children: ReactNode;
  title: string;
}

const DashboardElement: FC<DashboardElementProps> = ({
  isLoading,
  isError,
  refetch,
  children,
  title,
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-full flex flex-row justify-center items-center rounded-md shadow-xl gap-2 border min-h-[300px]">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : isError ? (
            <SectionFetchError refetch={refetch} />
          ) : (
            <div className="px-8 py-4 flex flex-col justify-center items-center">
              <h3 className="mb-4 text-center">{title}</h3>
              {children}
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="h-[calc(100%-100px)] w-[calc(100vw-100px)] flex flex-col justify-center items-center">
        <h3 className="mb-4 text-center text-2xl">{title}</h3>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DashboardElement;
