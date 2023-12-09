import LanguageToggle from "@/components/language-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { FC } from "react";
import { useTranslation } from "react-i18next";
const Home: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-screen justify-between flex flex-row">
      <p>{t("home")}</p>
      <ModeToggle />
      <LanguageToggle />
    </div>
  );
};

export default Home;
