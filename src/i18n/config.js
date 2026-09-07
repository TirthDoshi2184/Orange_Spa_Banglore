import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import kn from "./kn.json";

const STORAGE_KEY = "ois-bangalore-lang";
const savedLang = typeof window !== "undefined" ? window.localStorage?.getItem(STORAGE_KEY) : null;

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    kn: { translation: kn },
  },
  lng: savedLang || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

i18next.on("languageChanged", (lng) => {
  try {
    window.localStorage?.setItem(STORAGE_KEY, lng);
    document.documentElement.setAttribute("lang", lng === "kn" ? "kn" : "en-IN");
  } catch {
    /* localStorage unavailable — non-critical */
  }
});

export default i18next;
