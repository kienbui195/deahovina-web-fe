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
import { useDispatch } from "react-redux";
import { chooseLang } from "@/lib/features/multiContentSlice";
import { useSearchParams } from "next/navigation";

const SelectLanguage = () => {
  const { getLabel } = useGetLabel();
  const dispatch = useDispatch();
  const queryLang = useSearchParams().get("_lang");
  const [lang, setLang] = React.useState<string>(queryLang || "vi");

  React.useEffect(() => {
    dispatch(
      chooseLang(
        lang === "vi"
          ? "vi"
          : lang === "en"
          ? "en"
          : lang === "kr"
          ? "kr"
          : "vi"
      )
    );
  }, [lang, queryLang]);

  return (
    <Select value={lang} onValueChange={(val) => setLang(val)}>
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

export default SelectLanguage;
