"use client";

import ProductCarouselWithCate from "@/components/ProductCarouselWithCate";
import SectionInfo from "@/components/SectionInfo";
import SectionNews from "@/components/SectionNews";
import { IGlobalData, ITopBanner } from "@/dataTypes";
import { useEffect, useState } from "react";
import TopBanner from "@/components/TopBanner";
import apis from "@/apis";
import SectionSolution from "@/components/SolutionSection";
import TimelineSection from "@/components/TimelineSection";

export default function Home() {
  const [topBanner, setTopBanner] = useState<ITopBanner[]>([]);

  const handleGetGlobal = async () => {
    await apis.getGlobalData().then(res => {
      const { attributes } = res.data.data;
      const data: IGlobalData = {
        top_banner: attributes.top_banner.reduce((acc: any[], _item: any) => {
          const { id, link_on_click, image } = _item;

          acc.push({
            id,
            link_on_click,
            url: image.data.attributes.url,
          });
          return acc;
        }, []),
      };
      setTopBanner(data.top_banner as ITopBanner[]);
    });
  };

  useEffect(() => {
    handleGetGlobal();
  }, []);

  return (
    <main className="flex flex-col items-stretch">
      <TopBanner data={topBanner} />
      <TimelineSection
        items={[
          { dateTime: new Date("2024-01-01") , content: "New Year's Day" },
          { dateTime: new Date("2024-02-14"), content: "Valentine's Day" },
          { dateTime: new Date("2024-07-04"), content: "Independence Day" },
        ]}
      />
      <SectionSolution />
      <div className="lg:dhv-container dhv-container-sm">
        <section className="mt-[30px]">
          <ProductCarouselWithCate nameCate="máy tính công nghiệp, server" />
          <ProductCarouselWithCate nameCate="CLOUD, MQTT GATEWAY" />
        </section>
      </div>
    </main>
  );
}
