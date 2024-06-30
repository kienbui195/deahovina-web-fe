"use client";

import Image from "next/image";
import * as React from "react";
import Search from "../Search";
import SelectLanguage from "../SelectLanguage";
import { DefaultThumbnail2 } from "@/lib/svgExport";
import CategoryNavigation from "../CategoryNavigation";
import { Button } from "../ui/button";
import useGetLabel from "@/hooks/useGetLabel";

const Header = () => {
  const { getLabel } = useGetLabel();

  return (
    <header className=" fixed top-0 left-0 right-0 z-40">
      <div className="bg-white h-[83px] border-b border-slate-200">
        <div className="dhv-container h-full flex items-center justify-between m-auto">
          <Image
            alt=""
            src={DefaultThumbnail2}
            className="h-[60px] w-[169px] object-cover border"
            width={0}
            height={0}
            sizes="100vw"
          />
          <Search className="max-w-[720px] w-full" />
          <div className="flex items-center gap-4">
            <Button variant={"destructive"} className="font-bold uppercase">
              {getLabel("button.baogia.label")}
            </Button>
            <SelectLanguage />
          </div>
        </div>
      </div>
      <CategoryNavigation />
    </header>
  );
};

export default Header;
