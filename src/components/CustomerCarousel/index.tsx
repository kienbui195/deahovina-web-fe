"use client";
import { AlignJustify } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import apis from "@/apis";
import { createQuery } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { ICustomerSite } from "@/dataTypes";
import { DefaultThumbnail2 } from "@/lib/svgExport";

const CustomerCarousel = ({
}: {
}) => {
  const [customerSites, setCustomerSites] = useState<ICustomerSite[]>([]);
  const settingLang = useSelector((state: RootState) => state.contentLang.lang);

  const getCustomerSites = () => {
    apis
      .getPublic(
        "customer-sites",
        createQuery({
          populate: {
            logo: {
              fields: ["url"],
            },
          },
        })
      )
      .then((res) => {
        const { data } = res.data;
        setCustomerSites(data);
      });
  };

  useEffect(() => {
    getCustomerSites();
  }, [settingLang]);

  if (customerSites.length < 1) {
    return null
  }

  return (
    <section className="flex flex-col space-y-6 mt-[30px] w-full">
      <div className="relative h-[48px]">
        <div className="absolute top-0 left-0 bg-white border border-slate-200 p-[6px_18px] h-full flex flex-row items-center space-x-4">
          <AlignJustify className="w-6 h-6" />
          <span className="text-blue-600 uppercase font-bold">
            Khách hàng
          </span>
        </div>
        <div className="w-full h-full flex flex-row items-center">
          <div className="h-[2px] w-full bg-slate-200"></div>
        </div>
      </div>
      <Carousel className="max-h-[500px] z-0">
        <CarouselContent>
          {customerSites.map((c, index) => (
            <CarouselItem
              key={index}
              className="cursor-pointer basis-[20%] p-0 ml-8">
              <div className="w-full flex justify-center">
                <Image
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={
                    c.attributes.logo.data ? 
                    process.env.NEXT_PUBLIC_BE + c.attributes.logo.data.attributes.url
                    : DefaultThumbnail2
                  }
                  className="object-cover max-h-[400px] h-full w-full border rounded-xl"
                />
              </div>
              <div className="mt-4">
                <div className="text-xl font-bold text-center">{c.attributes.name}</div>
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

export default CustomerCarousel;
