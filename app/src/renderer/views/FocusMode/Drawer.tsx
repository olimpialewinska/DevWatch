import { Button } from "@/renderer/components/ui/button";
import {
  DrawerTrigger,
  Drawer as D,
  DrawerContent,
} from "@/renderer/components/ui/drawer";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

const Drawer: FC = () => {
  const { t } = useTranslation();
  return (
    <D>
      <DrawerTrigger asChild>
        <Button variant="secondary">{t("details")}</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[200px]"></DrawerContent>
    </D>
  );
};

export default Drawer;
