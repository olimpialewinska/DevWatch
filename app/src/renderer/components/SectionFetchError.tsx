import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "../lib/utils";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

interface SectionFetchErrorProps {
  className?: string;
  title?: string;
  description?: string;
  refetch?: () => void;
}

const SectionFetchError: FC<SectionFetchErrorProps> = ({
  className,
  title = "errorOccurred",
  description = "errorOccurredDescription",
  refetch,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        "w-full flex flex-col justify-center items-center py-10",
        className
      )}
    >
      <AlertCircle size={64} className="text-destructive mb-4" />
      <h1 className="text-2xl font-bold">{t(title)}</h1>
      <p className="text-center text-lg mt-2">{t(description)}</p>
      <Button onClick={refetch} className="mt-6">
        {t("refresh")}
      </Button>
    </div>
  );
};

export default SectionFetchError;
