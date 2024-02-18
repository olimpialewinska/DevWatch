import { LogOut } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";
import { useTranslation } from "react-i18next";
import { AuthContext } from "./AuthProvider";
import { URLS } from "../constants/urls";

export function LogoutButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  return (
    <Tooltip text={t("logout")}>
      <Button
        variant="outline"
        size="icon"
        className="min-w-[40px]"
        onClick={() => {
          void logout();
          navigate(URLS.HOME);
        }}
      >
        <LogOut size={20} />
      </Button>
    </Tooltip>
  );
}
