import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "../lib/utils";
import { AlertCircle } from "lucide-react";

interface SectionFetchErrorProps {
  className?: string;
  title?: string;
  description?: string;
}

const SectionFetchError: FC<SectionFetchErrorProps> = ({
  className,
  title = "errorOccurred",
  description = "errorOccurredDescription",
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
    </div>
  );
};

export default SectionFetchError;
