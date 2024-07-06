import { IMultiLangContentState, IMultiLangContentValue } from "@/dataTypes";
import { vi } from "./vi";
import { en } from "./en";
import { kr } from "./kr";

const MultilingualContent: IMultiLangContentState = {
  "vi-VN": vi,
  en,
  "ko-KR": kr,
};

export default MultilingualContent;
