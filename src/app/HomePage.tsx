"use client";

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
import Swal from "sweetalert2";

export default function Home() {
  return (
    <main className="dhv-container flex justify-center items-center mt-[140px]">
      <Carousel className="max-h-[400px] border">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
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
    </main>
  );
}
