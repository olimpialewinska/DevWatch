import React, { FC } from "react";
import { store } from "../stores";
import { formatTimeMs } from "../lib/formatTime";
import { observer } from "mobx-react-lite";
import { cn } from "../lib/utils";

interface TimeRowsProps {
  className?: string;
}

const TimeRows: FC<TimeRowsProps> = observer(({ className }) => {
  const activeWindow = store.activeWindow;
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 w-full max-w-xl text-lg",
        className
      )}
    >
      {Object.entries(activeWindow.windowTime).map(
        ([windowName, timeSpent]) => (
          <div
            key={windowName}
            className="w-full flex flex-row justify-between px-4 py-2 rounded-md shadow-xl gap-2 border"
          >
            <span>{windowName}</span> <span>{formatTimeMs(timeSpent)}</span>
          </div>
        )
      )}
    </div>
  );
});

export default TimeRows;
