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
import { IProject } from "@/dataTypes";
import moment from "moment";

const ProductCarousel = ({}: {}) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const settingLang = useSelector((state: RootState) => state.contentLang.lang);

  const getProjects = () => {
    apis
      .getPublic(
        "projects",
        createQuery({
          populate: {
            thumbnails: {
              fields: ["url"],
            },
            customer_site: "*",
          },
          locale: settingLang,
        })
      )
      .then((res) => {
        const { data } = res.data;
        setProjects(data);
      });
  };

  useEffect(() => {
    getProjects();
  }, [settingLang]);

  if (projects.length < 1) {
    return null;
  }

  return (
    <section className="flex flex-col space-y-6 mt-[30px] w-full">
      <div className="relative h-[48px]">
        <div className="absolute top-0 left-0 bg-white border border-slate-200 p-[6px_18px] h-full flex flex-row items-center space-x-4">
          <AlignJustify className="w-6 h-6" />
          <span className="text-blue-600 uppercase font-bold">
            Dự án
          </span>
        </div>
        <div className="w-full h-full flex flex-row items-center">
          <div className="h-[2px] w-full bg-slate-200"></div>
        </div>
      </div>
      <Carousel className="max-h-[500px] z-0">
        <CarouselContent>
          {projects.map((p, index) => (
            <CarouselItem
              key={index}
              className="cursor-pointer basis-[30%] p-4 ml-8 border rounded-xl">
              <div className="w-full flex justify-center">
                <div className="">
                  <Carousel
                    className="z-10"
                    opts={{
                      loop: true,
                      watchDrag: false,
                    }}>
                    <CarouselContent>
                      {p.attributes.thumbnails.data.map((_image, idx) => {
                        return (
                          <CarouselItem key={idx}>
                            <Image
                              alt=""
                              src={
                                process.env.NEXT_PUBLIC_BE +
                                _image.attributes.url
                              }
                              className="object-cover max-h-[400px] h-full w-full border rounded-xl"
                              width={0}
                              height={0}
                              sizes="100vw"
                            />
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    <CarouselNext type="button" className="border-none" />
                  </Carousel>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xl font-bold">{p.attributes.name}</div>
                <div className="mt-1">
                  <strong>Installation date:</strong>&nbsp;
                  {moment(p.attributes.createdAt).format("YYYY/MM")}
                </div>
                <div className="mt-1">
                  <strong>Model:</strong>&nbsp;{p.attributes.model}
                </div>
                <div className="mt-1">
                  <strong>Power:</strong>&nbsp;{p.attributes.power}
                </div>
                <div
                  className="mt-1"
                  dangerouslySetInnerHTML={{
                    __html: p.attributes.desc,
                  }}></div>
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

export default ProductCarousel;
