"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ITopBanner } from "@/dataTypes";
import Image from "next/image";
import { DefaultThumbnail2 } from "@/lib/svgExport";
import useGetLabel from "@/hooks/useGetLabel";

const TopBanner = ({ data = [] }: { data: ITopBanner[] }) => {
  const isClient = React.useMemo(() => typeof window === "object", []);
  const { getLabel } = useGetLabel();

  if (data.length < 1) return null;

  return (
    <Carousel
      className="border"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {data.map((_, index) => (
          <CarouselItem key={index} className=" relative">
            <Image
              alt=""
              src={`${process.env.NEXT_PUBLIC_BE}${_.url}` || DefaultThumbnail2}
              className="h-[60vh] object-cover w-full"
              // className="h-[60vh] object-cover w-full transform transition ease-in-out hover:scale-110 duration-1000"
              width={0}
              height={0}
              sizes="100vw"
              // onClick={() => {
              //   if (!isClient) return;
              //   window.open(_.link_on_click, "_blank");
              // }}
            />
            <div className="absolute left-4 right-0 bottom-0 bg-blue-600 px-8 py-2 flex flex-col justify-center ">
              <span className="font-bold sm:text-4xl text-md text-white uppercase text-center">
                {getLabel("intro.company.name")}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default TopBanner;
