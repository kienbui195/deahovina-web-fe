import { IMultiLangContentValue, TLang } from "@/dataTypes";
import MultilingualContent from "@/locales";

export const getContentWithLang = (lang: TLang = 'vi') => {
  return MultilingualContent[lang]
};

