"use client";

import Link from "next/link";
import * as React from "react";
import { Button } from "../ui/button";
import useGetLabel from "@/hooks/useGetLabel";
import Image from "next/image";
import { SquareLogo } from "@/lib/svgExport";
import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import MenuNavigation from "../MenuNavigation";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const Footer = () => {
  const { getLabel } = useGetLabel();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <footer className="bg-blue-700 text-md mt-[30px] flex flex-col gap-6">
      <div
        className={cn(
          ["h-14 bg-blue-200 shadow-inner border-t content-center"],
          pathname.includes("contact-us") && "hidden"
        )}
      >
        <div className="font-bold container flex justify-between items-center">
          <div>DEAHO VINA</div>
          <Button
            className="font-bold bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push("/contact-us")}
          >
            {getLabel("footer.contact.button.label")}
          </Button>
        </div>
      </div>
      <div className="flex md:flex-row flex-wrap flex-col gap-4 justify-between lg:dhv-container dhv-container-sm py-10">
        <div className="flex-2 text-white font-semibold mb-[28px] text-sm max-w-[500px] text-wrap">
          <div className="flex flex-row gap-6">
            <Image
              alt=""
              src={SquareLogo}
              className="md:w-[160px] w-full flex-1 md:flex-none h-auto object-cover"
            />
            <div className="flex flex-col gap-2 justify-start items-start flex-1">
              <div className="flex gap-3 leading-6">
                <MapPin className="w-6 h-6" />
                <span className="leading-6 capitalize">
                  {getLabel("footer.contact.address")}
                </span>
              </div>
              <div className="flex gap-3 leading-4 items-start">
                <Phone className="w-3 h-3" />
                <div className="space-y-2">
                  <div>{"+84(VN)965-058-521"}</div>
                  <div>{"+82(KR)10-3145-0717"}</div>
                </div>
              </div>
              <Link
                href={`mailto:daehovina@gmail.com`}
                className="flex gap-3 leading-6 items-center hover:underline"
              >
                <Mail className="w-3 h-3" />
                <div>daehovina@gmail.com</div>
              </Link>
              <Link
                href={`mailto:daehovina@gmail.com`}
                className="flex gap-3 leading-6 items-center hover:underline"
              >
                <Globe className="w-3 h-3" />
                <div>example.deahovina.com</div>
              </Link>
            </div>
          </div>
          <div className="w-full mt-6 text-sm capitalize">
            {getLabel("intro.company.name")}
          </div>
          <div className="flex flex-row gap-1 mt-4">
            <Button size={"icon"} className="rounded-full">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button size={"icon"} className="rounded-full">
              <Instagram className="w-4 h-4" />
            </Button>
            <Button size={"icon"} className="rounded-full">
              <Mail className="w-4 h-4" />
            </Button>
            <Button size={"icon"} className="rounded-full">
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button size={"icon"} className="rounded-full">
              <Youtube className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="text-white font-semibold mb-[28px] flex-1">
          <div className="uppercase text-white font-semibold">Deaho Vina</div>
          <div className="h-1 md:w-[50px] bg-slate-300 my-4"></div>
          <div className="gap-5 -translate-y-3">
            <MenuNavigation direction="vertical" className="capitalize mt-0" />
          </div>
        </div>

        <div className="text-white font-semibold mb-[28px] flex-1">
          <div className="uppercase text-white font-semibold">
            {getLabel("footer.policy.label")}
          </div>
          <div className="h-1 md:w-[50px] bg-slate-300 my-4"></div>
          <div className="space-y-3">
            <Link href="/#" className="hover:underline block">
              {getLabel("footer.policy.rules")}
            </Link>
            <Link href="/#" className="hover:underline block">
              {getLabel("footer.policy.security")}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex text-slate-300 h-14 flex-row text-md font-semibold justify-center dhv-container-sm items-center bg-slate-500">
        Copyright 2024 ©. {getLabel("intro.company.name")}
      </div>
    </footer>
  );
};

export default Footer;
