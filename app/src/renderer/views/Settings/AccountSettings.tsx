import { Button } from "@/renderer/components/ui/button";
import { Dialog, DialogTrigger } from "@/renderer/components/ui/dialog";
import { Input } from "@/renderer/components/ui/input";
import { Separator } from "@/renderer/components/ui/separator";
import { URLS } from "@/renderer/constants/urls";
import { DialogContent } from "@radix-ui/react-dialog";
import { ArrowLeft, Save, Trash } from "lucide-react";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AccountSettings: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full overflow-hidden relative h-full rounded-xl p-8 font-thin dark:bg-black dark:border-white/[0.2] bg-white border border-input">
      <h1 className="uppercase tracking-wider text-2xl mb-7">
        {t("accountSettings")}
      </h1>
      <div className="flex flex-col gap-6 px-4 h-[calc(100%-60px)]">
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg">{t("email")}</p>
          <Input className="w-[250px]" />
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg">{t("password")}</p>
          <Input className="w-[250px]" placeholder="••••••••" />
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg">{t("confirmPassword")}</p>
          <Input className="w-[250px]" placeholder="••••••••" />
        </div>
        <Separator className="my-2" />
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg">{t("deleteAccount")}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash size={18} />
                <span>{t("delete")}</span>
              </Button>
            </DialogTrigger>
            <DialogContent>xd</DialogContent>
          </Dialog>
        </div>
        <div className="flex-1" />
        <div className="flex flex-row justify-between items-center">
          <Button className="gap-2" variant="secondary" asChild>
            <Link to={URLS.DASHBOARD}>
              <ArrowLeft size={18} />
              <span>{t("back")}</span>
            </Link>
          </Button>
          <Button className="gap-2">
            <Save size={18} />
            <span>{t("save")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
