"use client";

import Image from "next/image";
import * as React from "react";
import Search from "../Search";
import SelectLanguage from "../SelectLanguage";
import { DefaultThumbnail2, SquareLogo } from "@/lib/svgExport";
import CategoryNavigation from "../CategoryNavigation";
import { Button } from "../ui/button";
import useGetLabel from "@/hooks/useGetLabel";
import SideBar from "./SideBar";
import { cn } from "@/lib/utils";
import useIsAtTop from "@/hooks/useIsAtTop";
import useScrollDirection from "@/hooks/useScrollDirection";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import MenuNavigation from "../MenuNavigation";

const Header = () => {
  const { getLabel } = useGetLabel();
  const isNearTop = useIsAtTop();
  const isScrollDown = useScrollDirection();

  return (
    <header
      className={cn([
        !isNearTop
          ? "fixed h-[70px] transition-all duration-200"
          : "static h-[90px] transition-all duration-200",
        " top-0 left-0 right-0 z-40",
      ])}
    >
      <div
        className={cn([
          "w-full bg-blue-700 h-10 transition-all duration-200 items-end",
          !isScrollDown && isNearTop ? "flex" : "hidden",
        ])}
      >
        <div className="sm:dhv-container dhv-container-sm flex flex-row justify-end items-center gap-2 w-full text-white text-xs">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <div>0222 3903 996</div>
          </div>
          <div className="h-full w-1 bg-white"></div>
          <Link
            href={`mailto:daehovina@gmail.com`}
            className="flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <div>daehovina@gmail.com</div>
          </Link>
          <SelectLanguage />
        </div>
      </div>
      <div className="bg-white h-full border-b border-slate-200">
        <div className="sm:dhv-container dhv-container-sm h-full flex items-center sm:justify-between m-auto gap-2 justify-around">
          <div className="flex flex-row gap-2 items-center">
            <SideBar className="sm:hidden flex" />
            <Image
              alt=""
              src={SquareLogo}
              className={cn([
                "w-fit object-contain transition-all duration-200",
                !isNearTop ? "h-[70px]" : "h-[90px]",
              ])}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <MenuNavigation/>
          <Search className="max-w-[380px] sm:flex hidden ml-10" />
        </div>
      </div>
    </header>
  );
};

export default Header;
