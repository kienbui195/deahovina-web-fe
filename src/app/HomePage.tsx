"use client";

import ProductCarouselWithCate from "@/components/ProductCarouselWithCate";
import SectionInfo from "@/components/SectionInfo";
import SectionNews from "@/components/SectionNews";
import { ICustomerSite, IGlobalData, ITopBanner } from "@/dataTypes";
import { useEffect, useState } from "react";
import TopBanner from "@/components/TopBanner";
import apis from "@/apis";
import SectionSolution from "@/components/SolutionSection";
import TimelineSection from "@/components/TimelineSection";

export default function Home() {
  const [topBanner, setTopBanner] = useState<ITopBanner[]>([]);
  const [customerSites, setCustomerSites] = useState<ICustomerSite[]>([])

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
    }).catch((err) => {
      console.log(err.message)
    });
  };

  const getCustomerSite = () => {
    apis.getPublic("customer-sites").then((res) => {
      const { data } = res.data;
      setCustomerSites(data)
    }).catch((err) => {
      console.log(err.message)
    });
  }

  useEffect(() => {
    handleGetGlobal();
    getCustomerSite()
  }, []);

  return (
    <main className="flex flex-col items-stretch">
      <TopBanner data={topBanner} />
      <TimelineSection />
      <SectionSolution />
      {customerSites.length > 0 && (
      <div className="lg:dhv-container dhv-container-sm">
        <section className="mt-[30px]">
          {customerSites.map((c) => (
            <ProductCarouselWithCate customerSite={c} key={c.id} />
          ))}
        </section>
      </div>)}
    </main>
  );
}
