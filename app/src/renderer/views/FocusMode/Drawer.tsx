import { Button } from "@/renderer/components/ui/button";
import {
  DrawerTrigger,
  Drawer as D,
  DrawerContent,
} from "@/renderer/components/ui/drawer";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import Time from "@/renderer/views/Counter/Time";
import { ScrollArea } from "@/renderer/components/ui/scroll-area";
import TimeRows from "@/renderer/components/TimeRow";

const Drawer: FC = () => {
  const { t } = useTranslation();
  return (
    <D>
      <DrawerTrigger asChild>
        <Button variant="secondary">{t("details")}</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[300px]">
        <div className="flex flex-row justify-between items-center h-full px-10">
          <Time />
          <ScrollArea className="w-3/4 h-5/6 pr-2">
            <TimeRows className="w-full max-w-none pb-2" />
          </ScrollArea>
        </div>
      </DrawerContent>
    </D>
  );
};

export default Drawer;
