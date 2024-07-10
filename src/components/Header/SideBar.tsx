import * as React from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import MenuNavigation from "../MenuNavigation";
import SearchBar from "../Search";

const SideBar = ({ className }: { className?: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'} className={cn(["", className])}>
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-20">
          <SearchBar />
        </div>
        <div className="ml-4">
          <MenuNavigation direction="vertical" />
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
