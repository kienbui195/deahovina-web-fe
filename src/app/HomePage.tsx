"use client";

import ProductCarouselWithCate from "@/components/ProductCarouselWithCate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DefaultThumbnail, DefaultThumbnail2 } from "@/lib/svgExport";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import Swal from "sweetalert2";
import SectionInfo from "@/components/SectionInfo";

export default function Home() {
  return (
    <main className="dhv-container flex flex-col items-stretch mt-[140px]">
      <Carousel
        className="max-h-[400px] border"
        opts={{
          loop: true,
        }}
        plugins={[Autoplay({ delay: 5000 })]}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="cursor-pointer">
              <div className="p-1 w-full flex justify-center">
                <Image
                  alt=""
                  src={DefaultThumbnail2}
                  className=" object-cover max-h-[400px]"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <section className="mt-[30px]">
        <ProductCarouselWithCate nameCate="máy tính công nghiệp, server" />
        <ProductCarouselWithCate nameCate="CLOUD, MQTT GATEWAY" />
        <ProductCarouselWithCate nameCate="SERIAL TO ETHERNET CONVERTERS" />
        <ProductCarouselWithCate nameCate="CẢM BIẾN SENSOR" />
        <SectionInfo/>
      </section>
    </main>
  );
}
