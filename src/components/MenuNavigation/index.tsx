"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Link from "next/link";
import useGetLabel from "@/hooks/useGetLabel";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const MenuNavigation = () => {
  const { getLabel } = useGetLabel();
  const lang = useSelector((state: RootState) => state.contentLang.lang)
  const SOLUTIONS = React.useMemo(() => {
    return [
      {
        label: getLabel("navigation.solutions.solar"),
        href: "/solutions/solar",
      },
      {
        label: getLabel("navigation.solutions.power.distribution"),
        href: "/solutions/power-distribution",
      },
      {
        label: getLabel("navigation.solutions.electrical.automation"),
        href: "/solutions/electrical-automation",
      },
    ];
  }, [lang]);

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4 text-md ">
        <NavigationMenuItem>
          <Link href={"/"}>
            <NavigationMenuLink className="uppercase font-semibold">
              {getLabel("navigation.home.label")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/#"}>
            <NavigationMenuLink className="uppercase font-semibold">
              {getLabel("navigation.products.label")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="uppercase font-semibold p-0 text-md hover:!bg-transparent">
            {getLabel("navigation.solutions.label")}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[300px] p-4 flex flex-col gap-2 left-0">
              {SOLUTIONS.map((_solution, idx) => {
                return (
                  <Link
                    href={_solution.href}
                    key={idx}
                    className="hover:bg-slate-100 p-2 text-nowrap w-full"
                  >
                    <NavigationMenuLink>{_solution.label}</NavigationMenuLink>
                  </Link>
                );
              })}
            </div>
          </NavigationMenuContent>
          <Link href={"/solutions"}>
            <NavigationMenuLink className="uppercase font-semibold"></NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/solutions"}>
            <NavigationMenuLink className="uppercase font-semibold">
              {getLabel("navigation.services.label")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/about"}>
            <NavigationMenuLink className="uppercase font-semibold">
              {getLabel("navigation.about.label")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuNavigation;
