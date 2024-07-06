import { IMultiLangContentValue, TLang } from "@/dataTypes";
import MultilingualContent from "@/locales";

export const getContentWithLang = (lang: TLang = 'vi-VN') => {
  return MultilingualContent[lang]
};

