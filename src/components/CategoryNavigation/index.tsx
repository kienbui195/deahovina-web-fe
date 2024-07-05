import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SearchBar from "../Search";

const MenuItem = [
  {
    title: "Máy tính công nghiệp",
    href: "",
    desc: "",
    children: [
      {
        title: "",
        href: "",
        desc: "",
      },
    ],
  },

  {
    title: "cảm biến công nghiệp",
    href: "",
    desc: "",
    children: [
      {
        title: "",
        href: "",
        desc: "",
      },
    ],
  },
  {
    title: "đèn báo",
    href: "",
    desc: "",
    children: [
      {
        title: "",
        href: "",
        desc: "",
      },
    ],
  },
  {
    title: "thiết bị ngành nước",
    href: "",
    desc: "",
    children: [
      {
        title: "",
        href: "",
        desc: "",
      },
    ],
  },
  {
    title: "quan trắc môi trường",
    href: "",
    desc: "",
    children: [
      {
        title: "",
        href: "",
        desc: "",
      },
    ],
  },
  {
    title: "giải pháp quản lý",
    href: "",
    desc: "",
    children: [
      {
        title: "",
        href: "",
        desc: "",
      },
    ],
  },
  {
    title: "tự động hóa",
    href: "",
    desc: "",
    children: [
      {
        title: "",
        href: "",
        desc: "",
      },
    ],
  },
  {
    title: "data center",
    href: "",
    desc: "",
    children: [
      {
        title: "",
        href: "",
        desc: "",
      },
    ],
  },
  {
    title: "phục vụ y tế",
    href: "",
    desc: "",
    children: [
      {
        title: "",
        href: "",
        desc: "",
      },
    ],
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const CategoryNavigation = () => {
  return (
    <div className="bg-blue-700 text-white py-4 !m-auto">
      <NavigationMenu className="lg:flex hidden w-full m-auto">
        <NavigationMenuList className="font-bold text-xs uppercase justify-center flex-wrap gap-4 items-center">
          {MenuItem.map((_menu, idx) => {
            return (
              <NavigationMenuItem key={idx}>
                {_menu.children.length > 1 ? (
                  <React.Fragment>
                    <NavigationMenuTrigger>{_menu.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 lg:w-[500px] lg:grid-cols-2 lg:w-[600px]">
                        {_menu.children.map((_child, _idx) => {
                          return <ListItem />;
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </React.Fragment>
                ) : (
                  <Link
                    href={_menu.href}
                    legacyBehavior
                    passHref
                    className="text-nowrap text-ellipsis overflow-hidden"
                  >
                    <NavigationMenuLink className="">
                      {_menu.title}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="w-full lg:hidden flex px-4">
        <SearchBar className=" m-auto" />
      </div>
    </div>
  );
};

export default CategoryNavigation;
