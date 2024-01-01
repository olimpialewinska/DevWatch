import { FC, useEffect, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/components/useTheme";
import logoDark from "@/assets/infind-dark.png";
import logoLight from "@/assets/infind-light.png";
import { Link } from "react-router-dom";
import LanguageToggle from "../language-toggle";
import { useTranslation } from "react-i18next";
import WebMenu from "./WebMenu";
import { Button } from "../ui/button";
import { AlignJustifyIcon } from "lucide-react";
import { MobileMenu } from "./MobileMenu";

function getCurrentWidth() {
  return window.innerWidth;
}

const Navbar: FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [screenWidth, setScreenWidth] = useState(getCurrentWidth());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateDimension = () => {
      setScreenWidth(getCurrentWidth());
      if (screenWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenWidth]);

  return (
    <div className="h-14 shadow-md w-screen flex justify-between items-center px-4 min-w-[206px] box-border">
      <Link to="/" className="min-w-min md:min-w-[206px]">
        <img
          src={theme === "dark" ? logoDark : logoLight}
          alt="logo"
          className="h-9 min-w-[105px]"
        />
      </Link>

      {screenWidth > 768 && <WebMenu />}
      {isMenuOpen && screenWidth < 768 && (
        <MobileMenu setIsMenuOpen={setIsMenuOpen} />
      )}

      <div className="flex-row flex gap-3 min-w-[206px] justify-end">
        {screenWidth > 768 && (
          <Link
            to="/login"
            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50  "
          >
            {t("login")}
          </Link>
        )}
        <LanguageToggle />
        <ModeToggle />
        {screenWidth < 768 && (
          <Button
            variant="outline"
            size="icon"
            className="min-w-[40px]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AlignJustifyIcon size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
