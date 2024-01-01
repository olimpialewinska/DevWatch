import i18n, { Language, languages } from "@/renderer/i18n/i18n";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const LanguageToggle = () => {
  const [language, setLanguage] = useState(i18n.language);

  const toggleLanguage = (language: Language) => {
    i18n.changeLanguage(language);
    setLanguage(language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="min-w-[40px] uppercase"
        >
          {language}
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language}
            className="uppercase"
            onClick={() => toggleLanguage(language)}
          >
            {language}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
