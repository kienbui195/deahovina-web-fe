"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import {
  EnglishFlagIcon,
  KoreaFlagIcon,
  VietnamFlagIcon,
} from "@/lib/svgExport";
import useGetLabel from "@/hooks/useGetLabel";
import { useDispatch, useSelector } from "react-redux";
import { chooseLang } from "@/lib/features/multiContentSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { RootState } from "@/lib/store";
import { TLang } from "@/dataTypes";
import NotFound from "@/app/NotFound";

const SelectLanguage = () => {
  const { getLabel } = useGetLabel();
  const dispatch = useDispatch();
  const queryLang = useSearchParams().get("_lang");
  const settingLang = useSelector((state: RootState) => state.contentLang.lang)
  const router = useRouter()

  React.useEffect(() => {
    if (!queryLang) return;
    dispatch(chooseLang(queryLang as TLang));
    localStorage.setItem("DHV_LANG", queryLang);
  }, [queryLang]);

  return (
    <Select
      value={settingLang}
      onValueChange={(val) => {
        dispatch(chooseLang((val as TLang)));
        localStorage.setItem("DHV_LANG", val);
        router.push(`/?_lang=${val}`)
      }}
    >
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder={getLabel("select.language.placeholder")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="vi">
          <div className="flex flex-row items-center gap-2">
            <Image src={VietnamFlagIcon} alt="" className="w-6 h-6" />
            <div>{getLabel("select.language.label.vi")}</div>
          </div>
        </SelectItem>
        <SelectItem value="en">
          <div className="flex flex-row items-center gap-2">
            <Image src={EnglishFlagIcon} alt="" className="w-6 h-6" />
            <div>{getLabel("select.language.label.en")}</div>
          </div>
        </SelectItem>
        <SelectItem value="kr">
          <div className="flex flex-row items-center gap-2">
            <Image src={KoreaFlagIcon} alt="" className="w-6 h-6" />
            <div>{getLabel("select.language.label.kr")}</div>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

const SelectLanguageDropdown = () => {
  return (
    <React.Suspense fallback={<NotFound/>}>
      <SelectLanguage/>
    </React.Suspense>
  )
}

export default SelectLanguageDropdown