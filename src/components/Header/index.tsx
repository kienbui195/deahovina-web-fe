"use client";

import Image from "next/image";
import * as React from "react";
import Search from "../Search";
import SelectLanguage from "../SelectLanguage";
import { SquareLogo } from "@/lib/svgExport";
import SideBar from "./SideBar";
import { cn } from "@/lib/utils";
import useIsAtTop from "@/hooks/useIsAtTop";
import useScrollDirection from "@/hooks/useScrollDirection";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import MenuNavigation from "../MenuNavigation";

const Header = () => {
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
          "w-full bg-blue-700 h-10 transition-all duration-200 items-end !hidden md:!flex",
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
          <SelectLanguage
            backgroundColor="bg-blue-700 hover:bg-blue-600"
            bgContentColor="bg-blue-700"
          />
        </div>
      </div>
      <div className="bg-white h-full border-b border-slate-200">
        <div className="sm:dhv-container dhv-container-sm h-full flex items-center justify-between m-auto gap-2">
          <div className="flex flex-row gap-2 items-center">
            <SideBar className="sm:hidden flex" />
            <Image
              alt=""
              src={SquareLogo}
              className={cn([
                "w-fit object-contain transition-all duration-200 md:flex hidden",
                !isNearTop ? "h-[70px]" : "h-[90px]",
              ])}
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
          <Image
            alt=""
            src={SquareLogo}
            className={cn([
              "w-fit object-contain transition-all duration-200 md:hidden flex",
              !isNearTop ? "h-[70px]" : "h-[90px]",
            ])}
            width={0}
            height={0}
            sizes="100vw"
          />
          <MenuNavigation />
          <div className="md:hidden flex">
            <SelectLanguage
              backgroundColor="bg-transparent"
              bgContentColor="bg-white"
            />
          </div>
          <Search className="max-w-[380px] sm:flex hidden ml-10" />
        </div>
      </div>
    </header>
  );
};

export default Header;
