"use client";

import Image from "next/image";
import * as React from "react";
import Search from "../Search";
import SelectLanguage from "../SelectLanguage";
import { DefaultThumbnail2 } from "@/lib/svgExport";
import CategoryNavigation from "../CategoryNavigation";
import { Button } from "../ui/button";
import useGetLabel from "@/hooks/useGetLabel";
import SideBar from "./SideBar";
import { cn } from "@/lib/utils";
import useIsAtTop from "@/hooks/useIsAtTop";

const Header = () => {
  const { getLabel } = useGetLabel();
  const isNearTop = useIsAtTop()

  return (
    <header
      className={cn([
        !isNearTop
          ? "fixed  transition-all duration-200"
          : "static  transition-all duration-200",
        " top-0 left-0 right-0 z-40",
      ])}
    >
      <div className="bg-white h-[83px] border-b border-slate-200">
        <div className="sm:dhv-container dhv-container-sm h-full flex items-center sm:justify-between m-auto gap-2 justify-around">
          <SideBar className="sm:hidden flex" />
          <Image
            alt=""
            src={DefaultThumbnail2}
            className="h-[60px] w-[169px] object-cover border"
            width={0}
            height={0}
            sizes="100vw"
          />
          <Search className="max-w-[720px] w-full sm:flex hidden" />
          <div className="flex items-center gap-4">
            <Button
              variant={"destructive"}
              className="font-bold uppercase sm:flex hidden"
            >
              {getLabel("button.baogia.label")}
            </Button>
            <SelectLanguage />
          </div>
        </div>
      </div>
      <div className="w-full bg-blue-700">
        <CategoryNavigation />
      </div>
    </header>
  );
};

export default Header;
