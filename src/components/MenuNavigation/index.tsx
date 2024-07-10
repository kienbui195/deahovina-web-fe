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
  className
}: {
  direction?: "horizontal" | "vertical";
  className?: string;
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
  const [collapSolutions, setCollapseSolution] = React.useState<boolean>(false);

  return direction === "horizontal" ? (
    <NavigationMenu className="md:flex-wrap md:flex hidden">
      <NavigationMenuList className={cn(["gap-4 text-md"])}>
        <NavigationMenuItem>
          <Link href={"/"}>
            <NavigationMenuLink className="uppercase font-semibold">
              {getLabel("navigation.home.label")}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={"/products"}>
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
    <div className={cn(["uppercase font-bold mt-8", className])}>
      <Link href={"/"} className="py-2 block w-fit">
        {getLabel("navigation.home.label")}
      </Link>
      <Link href={"/products"} className="py-2 block w-fit">
        {getLabel("navigation.products.label")}
      </Link>
      <Collapsible
        open={collapSolutions}
        onOpenChange={(val) => {
          setCollapseSolution(val);
        }}
      >
        <CollapsibleTrigger asChild>
          <span className="py-2 flex flex-row items-center gap-4 cursor-pointer w-fit">
            <span>{getLabel("navigation.solutions.label")}</span>
            <ChevronDown
              className={cn([
                "w-4 h-4 transition-all duration-200",
                collapSolutions ? "rotate-180" : "",
              ])}
            />
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="gap-2 flex flex-col ml-3 ">
            {SOLUTIONS.map((item, idx) => {
              return (
                <Link key={idx} href={item.href} className="block w-fit">
                  {item.label}
                </Link>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Link href={"/services"} className="py-2 block w-fit">
        {getLabel("navigation.services.label")}
      </Link>
      <Link href={"/about"} className="py-2 block w-fit">
        {getLabel("navigation.about.label")}
      </Link>
    </div>
  );
};

export default MenuNavigation;
