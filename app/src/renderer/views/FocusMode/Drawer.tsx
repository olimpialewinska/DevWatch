import { Button } from "@/renderer/components/ui/button";
import {
  DrawerTrigger,
  Drawer as D,
  DrawerContent,
} from "@/renderer/components/ui/drawer";
import { store } from "@/renderer/stores";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import Time from "@/renderer/views/Counter/Time";

const Drawer: FC = () => {
  const { t } = useTranslation();
  const timeStore = store.time;
  return (
    <D>
      <DrawerTrigger asChild>
        <Button variant="secondary">{t("details")}</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[300px]">
        <div className="flex flex-row justify-between items-center h-full">
          <Time />
        </div>
      </DrawerContent>
    </D>
  );
};

export default Drawer;
