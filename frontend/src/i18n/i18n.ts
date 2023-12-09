import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./resources/en";
import pl from "./resources/pl";

export const resources = {
  en: {
    translation: en,
  },
  pl: {
    translation: pl,
  },
};

export type Language = keyof typeof resources;

export const languages = Object.keys(resources) as Language[];

if (localStorage.getItem("i18nextLng") === null) {
  localStorage.setItem("i18nextLng", "en");
}

void i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    supportedLngs: languages,
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },
    keySeparator: ".",
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
