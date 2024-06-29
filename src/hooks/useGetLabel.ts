import { RootState } from "@/lib/store";
import * as React from "react";
import { useSelector } from "react-redux";

const useGetLabel = () => {
  const labelLang = useSelector((state: RootState) => state.contentLang);

  const getLabel = (key: string): string => {
    return `${
      labelLang.find((content) => content.key === key)?.content || undefined
    }`;
  };

  return {getLabel}
};

export default useGetLabel
