import { TextGenerateEffect } from "@/renderer/components/ui/text-generate-effect";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

const History: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full p-6 flex flex-col gap-6 pt-2">
      <div className="flex flex-row justify-between items-center">
        <TextGenerateEffect words={t("history")} className="font-thin" />
      </div>
    </div>
  );
};

export default History;
