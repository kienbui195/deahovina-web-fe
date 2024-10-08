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
import { useRouter } from "next/navigation";
import useGetLabel from "@/hooks/useGetLabel";

const Header = () => {
  const isNearTop = useIsAtTop();
  const isScrollDown = useScrollDirection();
  const router = useRouter();
  const { getLabel } = useGetLabel()

  return (
    <header
      className={cn([
        !isNearTop
          ? "fixed transition-all duration-200"
          : "static transition-all duration-200",
        " top-0 left-0 right-0 z-40",
      ])}
    >
      <div
        className={cn([
          "w-full bg-blue-700 h-10 transition-all duration-200 items-end !hidden sm:!flex",
          !isScrollDown && isNearTop ? "flex" : "hidden",
        ])}
      >
        <div className="sm:dhv-container dhv-container-sm flex flex-row justify-end items-center gap-2 w-full text-white text-xs">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <div>{getLabel("top-header.phone-number")}</div>
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
        <div className="lg:dhv-container dhv-container-sm h-full flex items-center justify-between m-auto gap-2">
          <div className="flex flex-row gap-2 items-center">
            <SideBar className="md:hidden flex" />
            <Link href={"/"}>
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
            </Link>
          </div>
          <Image
            alt=""
            src={SquareLogo}
            className={cn([
              "2 w-fit object-contain transition-all duration-200 md:hidden flex cursor-pointer",
              !isNearTop ? "h-[70px]" : "h-[90px]",
            ])}
            width={0}
            height={0}
            sizes="100vw"
            onClick={() => router.push("/")}
          />
          <MenuNavigation />
          <div className="lg:hidden flex">
            <SelectLanguage
              backgroundColor="bg-transparent"
              bgContentColor="bg-white"
            />
          </div>
          <Search className="max-w-[380px] lg:flex hidden ml-10" />
        </div>
      </div>
    </header>
  );
};

export default Header;
