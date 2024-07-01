import {
  AlignJustify,
  HandPlatter,
  Headset,
  PiggyBank,
  ShieldCheck,
} from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import { DefaultThumbnail2 } from "@/lib/svgExport";

const SectionNews = () => {
  return (
    <section className="flex flex-col space-y-6 mt-[30px]">
      <div className="relative  h-[48px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white border border-slate-200 p-[6px_18px] h-full flex flex-row items-center space-x-4">
          <AlignJustify className="w-6 h-6" />
          <span className="text-blue-600 uppercase font-bold">
            TIN TỨC ATPRO CORP
          </span>
        </div>
        <div className="w-full h-full flex flex-row items-center">
          <div className="h-[2px] w-full bg-slate-200"></div>
        </div>
      </div>
      <Carousel className="max-h-[400px]">
        <CarouselContent>
          {Array.from({ length: 20 }).map((_, index) => (
            <CarouselItem key={index} className="cursor-pointer basis-[380px]">
              <div className="p-1 w-full flex justify-center">
                <Image
                  alt=""
                  src={DefaultThumbnail2}
                  className=" object-cover max-h-[400px] border"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default SectionNews;
