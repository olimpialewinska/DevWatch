import { TextGenerateEffect } from "@/renderer/components/ui/text-generate-effect";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

const Counter: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full p-6 flex flex-col gap-6 pt-4">
      <div className="flex flex-row justify-between items-center">
        <TextGenerateEffect words={t("counter")} className="font-thin" />
      </div>
    </div>
  );
};

export default Counter;