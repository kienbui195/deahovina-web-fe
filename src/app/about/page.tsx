"use client";
import apis from "@/apis";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ICompanyInfo } from "@/dataTypes";
import { RootState } from "@/lib/store";
import { DefaultThumbnail } from "@/lib/svgExport";
import { createQuery } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";
import { useSelector } from "react-redux";

const IndexPage = () => {
  const [aboutInfo, setAboutInfo] = React.useState<ICompanyInfo>({
    id: 0,
    attributes: {
      about_info: {
        content: "",
        hero_images: {
          data: [],
        },
        id: 0,
        hero_title: "DEA HO VINA",
      },
    },
  });

  const settingLang = useSelector((state: RootState) => state.contentLang.lang);

  const getAboutInfo = () => {
    apis
      .getPublic(
        "company-info",
        createQuery({
          populate: {
            main_specialization: "*",
            about_info: {
              populate: {
                hero_images: {
                  fields: ["url"],
                },
              },
            },
            basic_info: "*",
          },
          locale: settingLang,
        })
      )
      .then((res) => {
        const { data }: { data: ICompanyInfo } = res.data;
        setAboutInfo(data);
      });
  };

  React.useEffect(() => {
    getAboutInfo();
  }, [settingLang]);

  return (
    <main className="flex flex-col items-stretch">
      <section className="hero-banner mt-10">
        <div className="h-40 bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
          <div className="text-white font-bold text-center">
            {aboutInfo.attributes.about_info?.hero_title}
          </div>
        </div>
      </section>
      <div className="lg:dhv-container dhv-container-sm">
        <section className="about-info">
          <div
            className="mt-10"
            dangerouslySetInnerHTML={{
              __html: aboutInfo.attributes.about_info?.content || "",
            }}
          />
          <Carousel className="max-h-[400px] mt-10">
            <CarouselContent>
              {aboutInfo.attributes.about_info?.hero_images.data?.map(
                (img, index) => (
                  <CarouselItem
                    key={index}
                    className="cursor-pointer">
                    <div className="p-1 w-full flex justify-center">
                      <Image
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                        src={
                          img.attributes.url
                            ? process.env.NEXT_PUBLIC_BE + img.attributes.url
                            : DefaultThumbnail
                        }
                        className="object-cover max-h-[400px] h-full border w-full"
                      />
                    </div>
                  </CarouselItem>
                )
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
        <section className="main_specialization mt-10 flex justify-between h-auto space-x-4">
          {aboutInfo.attributes.main_specialization?.map((item) => (
            <Card className="w-1/5" key={item.id}>
              <CardContent className="p-4">
                <div className="font-bold text-xl text-wrap text-center">{item.name}</div>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
};

export default IndexPage;
