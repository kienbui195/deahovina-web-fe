import { RootState } from "@/lib/store";
import { vi } from "@/locales/vi";
import { useSelector } from "react-redux";

type TKeyOfLabel = (typeof vi)[number]["key"];

const useGetLabel = () => {
  const labelLang = useSelector(
    (state: RootState) => state.contentLang.content
  );

  const getLabel = (key: TKeyOfLabel): string | undefined => {
    return `${
      labelLang.find((content) => content.key === key)?.content ?? undefined
    }`;
  };

  return { getLabel };
};

export default useGetLabel;
