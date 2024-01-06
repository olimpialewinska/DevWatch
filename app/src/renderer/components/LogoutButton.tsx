import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import Tooltip from "./Tooltip";
import { useTranslation } from "react-i18next";

export function LogoutButton() {
  const { t } = useTranslation();
  return (
    <Tooltip text={t("logout")}>
      <Button variant="outline" size="icon" className="min-w-[40px]" asChild>
        <Link to="/">
          <LogOut size={20} />
        </Link>
      </Button>
    </Tooltip>
  );
}
