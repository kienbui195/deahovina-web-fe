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
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import { DefaultThumbnail2 } from "@/lib/svgExport";

const TopBanner = ({ data = [] }: { data: ITopBanner[] }) => {
  const [carouselH, setCarouselH] = React.useState("400px");

  React.useEffect(() => {
    const handleCalHeightOfCarousel = () => {
      const windowH = window.innerHeight;
      setCarouselH(`${windowH - 240}px`);
    };
    handleCalHeightOfCarousel();
    document.addEventListener("resize", handleCalHeightOfCarousel);

    return () =>
      document.removeEventListener("resize", handleCalHeightOfCarousel);
  }, []);

  if (data.length < 1) return null;

  return (
    <Carousel
      className="border mt-10"
      opts={{
        loop: true,
      }}
      plugins={[Autoplay({ delay: 5000 })]}
      style={{
        maxHeight: carouselH,
      }}
    >
      <CarouselContent>
        {data.map((_, index) => (
          <CarouselItem key={index}>
            <Link
              href={_.link_on_click}
              className="p-1 w-full flex justify-center"
              target="_blank"
            >
              <Image
                alt=""
                src={
                  `${process.env.NEXT_PUBLIC_BE}${_.url}` || DefaultThumbnail2
                }
                className="h-full object-cover w-full"
                width={0}
                height={0}
                sizes="100vw"
                style={{ maxHeight: carouselH }}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default TopBanner;
