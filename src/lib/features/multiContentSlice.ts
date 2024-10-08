import { IMultiLangContentValue, TLang } from "./../../dataTypes/index";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getContentWithLang } from "../function";

export interface IMultiLangContentInitState {
  lang: TLang;
  content: IMultiLangContentValue[];
}

const initialState = (): IMultiLangContentInitState => {
  const isClient = typeof window === "object";

  if (!isClient)
    return {
      lang: "vi-VN",
      content: getContentWithLang("vi-VN"),
    };
  const theLatestSelectedLang = localStorage.getItem("DHV_LANG");
  return {
    content: theLatestSelectedLang
      ? getContentWithLang(theLatestSelectedLang as TLang)
      : getContentWithLang("vi-VN"),
    lang: theLatestSelectedLang ? (theLatestSelectedLang as TLang) : "vi-VN",
  };
};

export const multiLangContentSlice = createSlice({
  name: "langContent",
  initialState,
  reducers: {
    chooseLang: (state, action: PayloadAction<TLang>) => {
      return state = {
        lang: action.payload,
        content: getContentWithLang(action.payload)
      }
    }
  },
});

export const { chooseLang } = multiLangContentSlice.actions;

export default multiLangContentSlice.reducer;
