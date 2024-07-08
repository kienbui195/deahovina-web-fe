"use client";
import useGetLabel from "@/hooks/useGetLabel";
import * as React from "react";

const IndexPage = ({ params }: { params: { slug: string } }) => {
  const { getLabel } = useGetLabel();

  return (
    <main className="mt-10 lg:dhv-container dhv-container-sm">
      <h2 className="uppercase text-[24px] sm:text-[36px] lg:text-[48px] font-bold my-5 sm:my-10 md:my-20 text-center">
        {getLabel("solution.solar.title")}
      </h2>
      <section className="solar-content mt-10">
        <div className="font-bold text-base sm:text-lg md:text-2xl">
            {getLabel("solution.solar.heading1")}
        </div>
        <></>
      </section>
    </main>
  );
};

export default IndexPage;
