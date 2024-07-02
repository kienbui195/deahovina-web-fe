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

const SelectLanguage = () => {
  const { getLabel } = useGetLabel();
  const dispatch = useDispatch();
  const queryLang = useSearchParams().get("_lang");
  const settingLang = useSelector((state: RootState) => state.contentLang.lang);
  const router = useRouter();

  React.useEffect(() => {
    if (!queryLang) return;
    dispatch(chooseLang(queryLang as TLang));
    localStorage.setItem("DHV_LANG", queryLang);
  }, [queryLang]);

  return (
    <Select
      value={settingLang}
      onValueChange={(val) => {
        dispatch(chooseLang(val as TLang));
        localStorage.setItem("DHV_LANG", val);
        router.push(`?_lang=${val}`);
      }}
    >
      <SelectTrigger className="w-fit bg-blue-700 border-blue-700 !border-none !outline-none active:!border-none">
        <SelectValue
          placeholder={getLabel("select.language.placeholder")}
          className="focus:border-none border-none outline-none active:!border-none"
        />
      </SelectTrigger>
      <SelectContent className="w-fit bg-blue-700">
        <SelectItem value="vi">
          <Image src={VietnamFlagIcon} alt="" className="w-6 h-6 mr-2" />
        </SelectItem>
        <SelectItem value="en">
          <Image src={EnglishFlagIcon} alt="" className="w-6 h-6 mr-2" />
        </SelectItem>
        <SelectItem value="kr">
          <Image src={KoreaFlagIcon} alt="" className="w-6 h-6 mr-2" />
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

const SelectLanguageDropdown = () => {
  return (
    <React.Suspense fallback={<React.Fragment />}>
      <SelectLanguage />
    </React.Suspense>
  );
};

export default SelectLanguageDropdown;
