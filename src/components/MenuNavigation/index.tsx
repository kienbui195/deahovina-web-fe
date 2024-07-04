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
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

const MenuNavigation = ({
  direction = "horizontal",
}: {
  direction?: "horizontal" | "vertical";
}) => {
  const { getLabel } = useGetLabel();
  const lang = useSelector((state: RootState) => state.contentLang.lang);
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
  const [collapSolutions, setCollapSolution] = React.useState<boolean>(false);

  return direction === "horizontal" ? (
    <NavigationMenu className="md:flex hidden">
      <NavigationMenuList className={cn(["gap-4 text-md"])}>
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
          <Link href={"/services"}>
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
  ) : (
    <nav className="flex flex-col gap-2 uppercase font-bold my-4">
      <Link href={"/"}>
        <div className="px-4 py-2 w-full">
          {getLabel("navigation.home.label")}
        </div>
      </Link>
      <Link href={"/#"}>
        <div className="px-4 py-2 w-full">
          {getLabel("navigation.products.label")}
        </div>
      </Link>
      <Collapsible
        open={collapSolutions}
        onOpenChange={(val) => {
          setCollapSolution(val);
        }}
      >
        <CollapsibleTrigger asChild>
          <div className="px-4 py-2 flex flex-row items-center gap-4">
            <div>{getLabel("navigation.solutions.label")}</div>
            <ChevronDown
              className={cn([
                "w-4 h-4  transition-all duration-200",
                collapSolutions ? "rotate-180" : "",
              ])}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="pl-4 gap-2 flex flex-col ml-3">
            {SOLUTIONS.map((item, idx) => {
              return (
                <Link key={idx} href={item.href}>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Link href={"/services"}>
        <div className="px-4 py-2 w-full">
          {getLabel("navigation.services.label")}
        </div>
      </Link>
      <Link href={"/about"}>
        <div className="px-4 py-2 w-full">
          {getLabel("navigation.about.label")}
        </div>
      </Link>
    </nav>
  );
};

export default MenuNavigation;
