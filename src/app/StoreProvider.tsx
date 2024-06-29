"use client";

import { store } from "@/lib/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { appWithTranslation } from "next-i18next";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider
