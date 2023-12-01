import { create } from "zustand";

export type LanguagesSupported = "en" | "de" | "zh" | "fr" | "es" | "hi" | "ru";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  de: "German",
  zh: "Mandarin",
  fr: "French",
  es: "Spanish",
  hi: "Hindi",
  ru: "Russian",
};
