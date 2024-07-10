import { IMultiLangContentValue, TLang } from "@/dataTypes";
import MultilingualContent from "@/locales";
import { DefaultThumbnail2 } from "./svgExport";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export const getContentWithLang = (lang: TLang = "vi-VN") => {
  return MultilingualContent[lang];
};

export const getImageURL = (url?: string): string | StaticImport => {
  return url
    ? url.includes("https")
      ? url
      : `${process.env.NEXT_PUBLIC_BE}${url}`
    : DefaultThumbnail2;
};

export const getFileURL = (url: string): string => {
  return url.includes("https") ? url : `${process.env.NEXT_PUBLIC_BE}${url}`;
};
