import { FC } from "react";
import { useTranslation } from "react-i18next";
const Home: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="w-screen justify-between flex flex-row">
      <p>{t("home")}</p>
    </div>
  );
};

export default Home;
