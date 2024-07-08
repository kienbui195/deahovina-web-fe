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
import useGetLabel from "@/hooks/useGetLabel";
import { RootState } from "@/lib/store";
import {
  Business1,
  Business2,
  Business3,
  Business4,
  DefaultThumbnail,
  Director1,
  Director2,
  Director3,
  Vision1,
  Vision2,
} from "@/lib/svgExport";
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
  const { getLabel } = useGetLabel();
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
                    className="cursor-pointer basis-[50%]">
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
        <section className="main_specialization">
          <h2 className="uppercase md:text-[40px] xl:text-[48px] font-bold my-20 text-center">
            {getLabel("about.main-specialization")}
          </h2>
          <div className=" mt-10 flex justify-between h-auto space-x-4">
            {aboutInfo.attributes.main_specialization?.map((item) => (
              <Card className="w-1/5" key={item.id}>
                <CardContent className="p-4">
                  <div className="font-bold text-xl text-wrap text-center">
                    {item.name}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="vision">
          <h2 className="uppercase md:text-[40px] xl:text-[48px] font-bold my-20 text-center">
            {getLabel("about.vision")}
          </h2>
          <div className="flex justify-between items-center h-auto space-x-10">
            <div className="flex space-x-4 items-center">
              <Image
                src={Vision1}
                alt=""
                sizes="100vw"
                width={200}
                height={200}
                className=""
              />
              <div className="text-xl font-semibold">
                {getLabel("about.vision-content-1")}
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              <Image
                src={Vision2}
                alt=""
                sizes="100vw"
                width={200}
                height={200}
                className=""
              />
              <div className="text-xl font-semibold">
                {getLabel("about.vision-content-2")}
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              <Image
                src={Vision1}
                alt=""
                sizes="100vw"
                width={200}
                height={200}
                className=""
              />
              <div className="text-xl font-semibold">
                {getLabel("about.vision-content-3")}
              </div>
            </div>
          </div>
        </section>
        <section className="business-strategy">
          <h2 className="uppercase md:text-[40px] xl:text-[48px] font-bold my-20 text-center">
            {getLabel("about.business-strategy")}
          </h2>
          <div className="grid grid-cols-2 gap-10">
            <div className="flex items-center space-x-4">
              <Image
                src={Business1}
                alt=""
                sizes="100vw"
                width={200}
                height={200}
                className=""
              />
              <div className="text-xl font-semibold">
                {getLabel("about.business-strategy-content-1")}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Image
                src={Business2}
                alt=""
                sizes="100vw"
                width={200}
                height={200}
                className=""
              />
              <div className="text-xl font-semibold">
                {getLabel("about.business-strategy-content-2")}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Image
                src={Business3}
                alt=""
                sizes="100vw"
                width={200}
                height={200}
                className=""
              />
              <div className="text-xl font-semibold">
                {getLabel("about.business-strategy-content-3")}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Image
                src={Business4}
                alt=""
                sizes="100vw"
                width={200}
                height={200}
                className=""
              />
              <div className="text-xl font-semibold">
                {getLabel("about.business-strategy-content-4")}
              </div>
            </div>
          </div>
        </section>
        <section className="organizational-structure">
          <h2 className="uppercase md:text-[40px] xl:text-[48px] font-bold my-20 text-center">
            {getLabel("about.organizational")}
          </h2>
          <div>
            <div className="flex items-center flex-col space-y-1">
              <Image
                src={Director1}
                alt=""
                sizes="100vw"
                width={150}
                height={150}
                className=""
              />
              <div className="text-3xl font-bold">{getLabel("about.organizational-director1")}</div>
              <div className="text-2xl font-medium">{getLabel("about.organizational-director1.1")}</div>
              <div className="text-2xl font-medium">{getLabel("about.organizational-director1.2")}</div>
            </div>
            <div className="flex items-center justify-between mt-10">
              <div className="flex items-center flex-col space-y-1 w-[350px]">
                <Image
                  src={Director2}
                  alt=""
                  sizes="100vw"
                  width={120}
                  height={120}
                  className=""
                />
                <div className="text-3xl font-bold">{getLabel("about.organizational-director2")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director2a")}</div>
              </div>
              <div className="flex items-center flex-col space-y-1 w-[350px]">
                <Image
                  src={Director2}
                  alt=""
                  sizes="100vw"
                  width={120}
                  height={120}
                  className=""
                />
                <div className="text-3xl font-bold">{getLabel("about.organizational-director2.1")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director2.1a")}</div>
              </div>
              <div className="flex items-center flex-col space-y-1 w-[350px]">
                <Image
                  src={Director2}
                  alt=""
                  sizes="100vw"
                  width={120}
                  height={120}
                  className=""
                />
                <div className="text-3xl font-bold">{getLabel("about.organizational-director2.2")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director2.2a")}</div>
              </div>
            </div>
            {/* <div className="flex items-center justify-between mt-10 space-x-4">
              <div className="flex items-center flex-col space-y-1">
                <Image
                  src={Director3}
                  alt=""
                  sizes="100vw"
                  width={80}
                  height={80}
                  className=""
                />
                <div className="text-3xl font-bold">{getLabel("about.organizational-director1")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director1.1")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director1.2")}</div>
              </div>
              <div className="flex items-center flex-col space-y-1">
                <Image
                  src={Director3}
                  alt=""
                  sizes="100vw"
                  width={80}
                  height={80}
                  className=""
                />
                <div className="text-3xl font-bold">{getLabel("about.organizational-director1")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director1.1")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director1.2")}</div>
              </div>
              <div className="flex items-center flex-col space-y-1">
                <Image
                  src={Director3}
                  alt=""
                  sizes="100vw"
                  width={80}
                  height={80}
                  className=""
                />
                <div className="text-3xl font-bold">{getLabel("about.organizational-director1")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director1.1")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director1.2")}</div>
              </div>
              <div className="flex items-center flex-col space-y-1">
                <Image
                  src={Director3}
                  alt=""
                  sizes="100vw"
                  width={80}
                  height={80}
                  className=""
                />
                <div className="text-3xl font-bold">{getLabel("about.organizational-director1")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director1.1")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director1.2")}</div>
              </div>
              <div className="flex items-center flex-col space-y-1">
                <Image
                  src={Director3}
                  alt=""
                  sizes="100vw"
                  width={80}
                  height={80}
                  className=""
                />
                <div className="text-3xl font-bold">{getLabel("about.organizational-director1")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director1.1")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director1.2")}</div>
              </div>
              <div className="flex items-center flex-col space-y-1">
                <Image
                  src={Director3}
                  alt=""
                  sizes="100vw"
                  width={80}
                  height={80}
                  className=""
                />
                <div className="text-3xl font-bold">{getLabel("about.organizational-director1")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director1.1")}</div>
                <div className="text-2xl font-medium">{getLabel("about.organizational-director1.2")}</div>
              </div>
            </div> */}
          </div>
        </section>
      </div>
    </main>
  );
};

export default IndexPage;
