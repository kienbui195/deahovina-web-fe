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
import { cn } from "@/lib/utils";
import WaitingPage from "../WaitingPage";

const SelectLanguage = ({
  backgroundColor,
  bgContentColor,
}: {
  backgroundColor?: string;
  bgContentColor?: string;
}) => {
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
      <SelectTrigger
        className={cn([
          "w-fit !border-none !outline-none active:!border-none",
          backgroundColor,
        ])}
      >
        <SelectValue
          placeholder={getLabel("select.language.placeholder")}
          className="focus:border-none border-none outline-none active:!border-none"
        />
      </SelectTrigger>
      <SelectContent className={cn(["w-fit", bgContentColor])}>
        <SelectItem value="vi-VN">
          <Image src={VietnamFlagIcon} alt="" className="w-6 h-6 mr-2" />
        </SelectItem>
        <SelectItem value="en">
          <Image src={EnglishFlagIcon} alt="" className="w-6 h-6 mr-2" />
        </SelectItem>
        <SelectItem value="ko-KR">
          <Image src={KoreaFlagIcon} alt="" className="w-6 h-6 mr-2" />
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

const SelectLanguageDropdown = ({ ...props }) => {
  return (
    <React.Suspense fallback={<React.Fragment />}>
      <SelectLanguage {...props} />
    </React.Suspense>
  );
};

export default SelectLanguageDropdown;
